import { githubEventsSchema } from '@/features/home/schemas/githubActivitySchemas';
import { NextResponse } from 'next/server';

const GITHUB_EVENTS_URL =
  'https://api.github.com/users/nijoow/events/public?per_page=30';

export async function GET() {
  try {
    const response = await fetch(GITHUB_EVENTS_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 15 * 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_GITHUB_ACTIVITY',
            message: 'GitHub 활동을 불러오지 못했습니다.',
          },
        },
        { status: 502 },
      );
    }

    const parsed = githubEventsSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error('Invalid GitHub response');

    const seenCommits = new Set<string>();
    const commits = parsed.data.flatMap((event) => {
      if (event.type !== 'PushEvent') return [];

      return (event.payload.commits ?? []).flatMap((commit) => {
        if (seenCommits.has(commit.sha)) return [];
        seenCommits.add(commit.sha);

        return [
          {
            sha: commit.sha,
            message: commit.message.split('\n')[0] ?? commit.message,
            repository: event.repo.name.replace('nijoow/', ''),
            committedAt: event.created_at,
            url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          },
        ];
      });
    });

    return NextResponse.json({ success: true, data: commits.slice(0, 3) });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_GITHUB_ACTIVITY',
          message: 'GitHub 활동을 불러오지 못했습니다.',
        },
      },
      { status: 500 },
    );
  }
}
