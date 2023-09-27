import { getCurrentlyPlayingApi } from '@/lib/spotify'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const res = await getCurrentlyPlayingApi()
  if (res.status === 200) {
    const data = await res.json()
    const response = {
      title: data.item.name,
      artist: data.item.artists[0].name,
      albumImageUrl: data.item.album.images[0].url,
      songUrl: data.item.external_urls.spotify,
    }

    return NextResponse.json(response)
  } else return NextResponse.json(null)
}
