import { mapSpotifyTrack } from '@/features/home/lib/mapSpotifyTrack';
import {
  spotifyCurrentlyPlayingSchema,
  spotifyRecentlyPlayedSchema,
} from '@/features/home/schemas/spotifySchemas';
import { createApiError, createApiSuccess } from '@/lib/api';
import { getSpotifyActivityResponses } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const revalidate = 0;

async function parseCurrentTrack(response: Response) {
  if (response.status === 204) {
    return { isValid: true, isPlaying: false, music: null } as const;
  }
  if (!response.ok) {
    return { isValid: false, isPlaying: false, music: null } as const;
  }

  const payload: unknown = await response.json().catch(() => null);
  const parsed = spotifyCurrentlyPlayingSchema.safeParse(payload);

  return parsed.success
    ? {
        isValid: true,
        isPlaying: parsed.data.is_playing,
        music: parsed.data.item ? mapSpotifyTrack(parsed.data.item) : null,
      }
    : { isValid: false, isPlaying: false, music: null };
}

async function parseRecentTracks(response: Response) {
  if (!response.ok) return { isValid: false, music: [] } as const;

  const payload: unknown = await response.json().catch(() => null);
  const parsed = spotifyRecentlyPlayedSchema.safeParse(payload);

  if (!parsed.success) return { isValid: false, music: [] } as const;

  const music = parsed.data.items.flatMap(({ track, played_at }) => {
    const mappedTrack = mapSpotifyTrack(track, played_at);
    return mappedTrack ? [mappedTrack] : [];
  });

  return { isValid: true, music } as const;
}

export async function GET() {
  try {
    const [currentResponse, recentResponse] =
      await getSpotifyActivityResponses();
    const [currentResult, recentResult] = await Promise.all([
      parseCurrentTrack(currentResponse),
      parseRecentTracks(recentResponse),
    ]);

    if (!currentResult.isValid && !recentResult.isValid) {
      return NextResponse.json(
        createApiError(
          'INTERNAL_SPOTIFY_ACTIVITY',
          '재생 정보를 불러오지 못했습니다.',
        ),
        { status: 502 },
      );
    }

    const isPlaying = currentResult.isPlaying && currentResult.music !== null;
    const current = currentResult.music ?? recentResult.music[0] ?? null;
    const recent = recentResult.music
      .filter((music) => music.songUrl !== current?.songUrl)
      .slice(0, 5);

    return NextResponse.json(createApiSuccess({ current, recent, isPlaying }));
  } catch {
    return NextResponse.json(
      createApiError(
        'INTERNAL_SPOTIFY_ACTIVITY',
        '재생 정보를 불러오지 못했습니다.',
      ),
      { status: 500 },
    );
  }
}
