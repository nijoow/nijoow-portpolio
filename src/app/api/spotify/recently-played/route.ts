import { getRecentlyPlayedApi } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await getRecentlyPlayedApi()
  if (res.status === 200) {
    const data = await res.json()
    const response = {
      title: data.items[0].track.name,
      artist: data.items[0].track.artists[0].name,
      albumImageUrl: data.items[0].track.album.images[0].url,
      songUrl: data.items[0].track.external_urls.spotify,
    }

    return NextResponse.json(response)
  } else return NextResponse.json(null)
}
