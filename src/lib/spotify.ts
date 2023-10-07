const client_id = process.env.SPOTIFY_CLIENT_ID || ''
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || ''
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || ''

const ACCESS_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`

export const getAccessTokenApi = async () => {
  const response = await fetch(ACCESS_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    next: { revalidate: 3600 },
  })

  return response.json()
}

export const getCurrentlyPlayingApi = async () => {
  const { access_token } = await getAccessTokenApi()

  return await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  })
}

export const getRecentlyPlayedApi = async () => {
  const { access_token } = await getAccessTokenApi()

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  })

  return response
}
