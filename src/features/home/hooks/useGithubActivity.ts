import { githubActivityResponseSchema } from '@/features/home/schemas/githubActivitySchemas';
import { useQuery } from '@tanstack/react-query';

const fetchGithubActivity = async () => {
  const response = await fetch('/api/github/recent-repositories');
  const parsed = githubActivityResponseSchema.safeParse(await response.json());

  if (!parsed.success || !parsed.data.success) {
    throw new Error('GitHub 프로젝트를 확인할 수 없습니다.');
  }

  return parsed.data.data;
};

export const githubQueryKeys = {
  all: ['github'] as const,
  activity: () => [...githubQueryKeys.all, 'activity'] as const,
};

export function useGithubActivity() {
  return useQuery({
    queryKey: githubQueryKeys.activity(),
    queryFn: fetchGithubActivity,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
