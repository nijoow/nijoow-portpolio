import axios from 'axios';
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || '';
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN || '';

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

export const getAccessTokenApi = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getNowPlayingApi = async () => {
  const { access_token } = await getAccessTokenApi();

  const { data } = await axios.get(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data;
};

export const getRecentlyPlayedApi = async () => {
  const { access_token } = await getAccessTokenApi();

  const { data } = await axios.get(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data;
};
