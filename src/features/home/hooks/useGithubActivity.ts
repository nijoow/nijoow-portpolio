import { githubRepositoryListSchema } from '@/features/home/schemas/githubActivitySchemas';
import { fetchApiData } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const fetchGithubActivity = () =>
  fetchApiData({
    input: '/api/github/recent-repositories',
    dataSchema: githubRepositoryListSchema,
    invalidResponseMessage: 'GitHub 프로젝트를 확인할 수 없습니다.',
  });

const GITHUB_ACTIVITY_QUERY_KEY = ['github', 'activity'] as const;

export function useGithubActivity() {
  return useQuery({
    queryKey: GITHUB_ACTIVITY_QUERY_KEY,
    queryFn: fetchGithubActivity,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
