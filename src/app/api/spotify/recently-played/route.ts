import { mapSpotifyTrack } from '@/features/home/lib/mapSpotifyTrack';
import { spotifyRecentlyPlayedSchema } from '@/features/home/schemas/spotifySchemas';
import { getRecentlyPlayedApi } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const res = await getRecentlyPlayedApi(6);
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_SPOTIFY_RECENT',
            message: '최근 재생 곡을 불러오지 못했습니다.',
          },
        },
        { status: 502 },
      );
    }

    const parsed = spotifyRecentlyPlayedSchema.safeParse(await res.json());
    if (!parsed.success) throw new Error('Invalid Spotify response');

    const music = parsed.data.items.flatMap(({ track, played_at }) => {
      const mappedTrack = mapSpotifyTrack(track, played_at);
      return mappedTrack ? [mappedTrack] : [];
    });

    return NextResponse.json({ success: true, data: music });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SPOTIFY_RECENT',
          message: '최근 재생 곡을 불러오지 못했습니다.',
        },
      },
      { status: 500 },
    );
  }
}
