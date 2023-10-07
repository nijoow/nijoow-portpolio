import { getRecentlyPlayedApi } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET(reqeust: Request) {
  try {
    const res = await getRecentlyPlayedApi()
    if (res.status === 200) {
      const data = await res.json()
      const response = {
        title: data.items[0].track.name,
        artist: data.items[0].track.artists[0].name,
        albumImageUrl: data.items[0].track.album.images[0].url,
        songUrl: data.items[0].track.external_urls.spotify,
      }

      return NextResponse.json({ payload: response, messaage: 'success' })
    } else {
      return NextResponse.json({ payload: null, message: res.statusText })
    }
  } catch (e) {
    return NextResponse.json({ payload: null, message: e })
  }
}
