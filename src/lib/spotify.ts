import { z } from 'zod';

const ACCESS_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
  'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_EXPIRY_BUFFER_MS = 60_000;

const spotifyEnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
});

const accessTokenResponseSchema = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().positive(),
});

interface CachedAccessToken {
  value: string;
  expiresAt: number;
}

let cachedAccessToken: CachedAccessToken | null = null;
let pendingAccessToken: Promise<string> | null = null;

function getSpotifyCredentials() {
  const parsed = spotifyEnvSchema.safeParse(process.env);
  if (!parsed.success)
    throw new Error('Spotify 환경변수가 설정되지 않았습니다.');
  return parsed.data;
}

async function requestAccessToken(): Promise<string> {
  const credentials = getSpotifyCredentials();
  const response = await fetch(ACCESS_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${credentials.SPOTIFY_CLIENT_ID}:${credentials.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: credentials.SPOTIFY_REFRESH_TOKEN,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw new Error('Spotify 인증에 실패했습니다.');

  const payload: unknown = await response.json().catch(() => null);
  const parsed = accessTokenResponseSchema.safeParse(payload);
  if (!parsed.success)
    throw new Error('Spotify 인증 응답이 올바르지 않습니다.');

  cachedAccessToken = {
    value: parsed.data.access_token,
    expiresAt:
      Date.now() + parsed.data.expires_in * 1_000 - TOKEN_EXPIRY_BUFFER_MS,
  };

  return cachedAccessToken.value;
}

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now()) {
    return cachedAccessToken.value;
  }

  pendingAccessToken ??= requestAccessToken();

  try {
    return await pendingAccessToken;
  } finally {
    pendingAccessToken = null;
  }
}

export async function getSpotifyActivityResponses(limit = 6) {
  const requestActivity = (accessToken: string) => {
    const requestInit: RequestInit = {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    };

    return Promise.all([
      fetch(NOW_PLAYING_ENDPOINT, requestInit),
      fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, requestInit),
    ]);
  };

  const accessToken = await getAccessToken();
  const responses = await requestActivity(accessToken);

  if (!responses.some((response) => response.status === 401)) {
    return responses;
  }

  cachedAccessToken = null;
  const refreshedAccessToken = await getAccessToken();
  return requestActivity(refreshedAccessToken);
}
