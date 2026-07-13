import { mapSpotifyTrack } from '@/features/home/lib/mapSpotifyTrack';
import { spotifyCurrentlyPlayingSchema } from '@/features/home/schemas/spotifySchemas';
import { getCurrentlyPlayingApi } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await getCurrentlyPlayingApi();

    if (res.status === 204) {
      return NextResponse.json({ success: true, data: null });
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_SPOTIFY_CURRENT',
            message: '현재 재생 중인 곡을 불러오지 못했습니다.',
          },
        },
        { status: 502 },
      );
    }

    const parsed = spotifyCurrentlyPlayingSchema.safeParse(await res.json());
    if (!parsed.success) throw new Error('Invalid Spotify response');

    const music = parsed.data.item ? mapSpotifyTrack(parsed.data.item) : null;

    return NextResponse.json({ success: true, data: music });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SPOTIFY_CURRENT',
          message: '현재 재생 중인 곡을 불러오지 못했습니다.',
        },
      },
      { status: 500 },
    );
  }
}
