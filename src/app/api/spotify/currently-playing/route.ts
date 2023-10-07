import { getCurrentlyPlayingApi } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function GET() {
  try {
    const res = await getCurrentlyPlayingApi()

    if (res.status === 200) {
      const data = await res.json()
      const response = {
        title: data.item.name,
        artist: data.item.artists[0].name,
        albumImageUrl: data.item.album.images[0].url,
        songUrl: data.item.external_urls.spotify,
      }

      return NextResponse.json({ payload: response, messaage: 'success' })
    } else {
      return NextResponse.json({ payload: null, message: res.statusText })
    }
  } catch (e) {
    return NextResponse.json({ payload: null, message: e })
  }
}
