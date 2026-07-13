import {
  currentMusicResponseSchema,
  recentMusicResponseSchema,
  type Music,
} from '@/features/home/schemas/spotifySchemas';
import { useQuery } from '@tanstack/react-query';

interface MusicActivity {
  current: Music | null;
  recent: Music[];
  isPlaying: boolean;
}

const fetchMusicActivity = async (): Promise<MusicActivity> => {
  const [currentResponse, recentResponse] = await Promise.all([
    fetch('/api/spotify/currently-playing'),
    fetch('/api/spotify/recently-played'),
  ]);

  const currentResult = currentMusicResponseSchema.safeParse(
    await currentResponse.json(),
  );
  const recentResult = recentMusicResponseSchema.safeParse(
    await recentResponse.json(),
  );

  const currentMusic =
    currentResult.success && currentResult.data.success
      ? currentResult.data.data
      : null;
  const recentMusic =
    recentResult.success && recentResult.data.success
      ? recentResult.data.data
      : [];

  if (!currentResult.success && !recentResult.success) {
    throw new Error('재생 정보를 확인할 수 없습니다.');
  }

  const isPlaying = currentMusic !== null;
  const current = currentMusic ?? recentMusic[0] ?? null;
  const recent = recentMusic
    .filter((music) => music.songUrl !== current?.songUrl)
    .slice(0, 5);

  return { current, recent, isPlaying };
};

export const spotifyQueryKeys = {
  all: ['spotify'] as const,
  activity: () => [...spotifyQueryKeys.all, 'activity'] as const,
};

export function useNowPlaying() {
  return useQuery({
    queryKey: spotifyQueryKeys.activity(),
    queryFn: fetchMusicActivity,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}
