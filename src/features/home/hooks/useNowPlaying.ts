import type { Music } from '@/type/interface';
import { useQuery } from '@tanstack/react-query';

interface SpotifyResponse {
  payload: Music | null;
}

// 현재 재생 중인 곡을 우선 조회하고, 없으면 최근 재생 곡으로 폴백한다.
const fetchNowPlaying = async (): Promise<Music | null> => {
  const currentlyPlaying: SpotifyResponse = await fetch(
    '/api/spotify/currently-playing',
  ).then((res) => res.json());
  if (currentlyPlaying.payload) return currentlyPlaying.payload;

  const recentlyPlayed: SpotifyResponse = await fetch(
    '/api/spotify/recently-played',
  ).then((res) => res.json());
  return recentlyPlayed.payload ?? null;
};

export const nowPlayingQueryKey = ['spotify', 'now-playing'] as const;

export function useNowPlaying() {
  return useQuery({
    queryKey: nowPlayingQueryKey,
    queryFn: fetchNowPlaying,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}
