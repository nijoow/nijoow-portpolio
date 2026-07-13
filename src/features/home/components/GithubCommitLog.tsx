'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { GithubIcon } from '@/components/Icons/GithubIcon';
import { useGithubActivity } from '@/features/home/hooks/useGithubActivity';
import type { GithubCommit } from '@/features/home/schemas/githubActivitySchemas';
import { ExternalLink, GitCommitHorizontal } from 'lucide-react';
import Image from 'next/image';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
});

function CommitRow({ commit }: { commit: GithubCommit }) {
  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/commit focus-visible:ring-purple-light flex min-w-0 items-center gap-3 rounded-xl px-2 py-2.5 transition-colors outline-none hover:bg-white/5 focus-visible:ring-2"
    >
      <span className="bg-purple-medium/15 text-purple-light flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10">
        <GitCommitHorizontal size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="group-hover/commit:text-purple-light block truncate text-sm font-bold transition-colors">
          {commit.message}
        </span>
        <span className="flex items-center gap-2 text-[11px] text-white/35">
          <span className="truncate">{commit.repository}</span>
          <span aria-hidden="true">·</span>
          <time className="shrink-0" dateTime={commit.committedAt}>
            {dateFormatter.format(new Date(commit.committedAt))}
          </time>
        </span>
      </span>
      <ExternalLink className="size-3.5 shrink-0 text-white/20 transition-colors group-hover/commit:text-white/60" />
    </a>
  );
}

export function GithubCommitLog() {
  const { data: commits, isPending, isError } = useGithubActivity();

  return (
    <GlassCard className="h-full min-h-96 bg-black/30">
      <div className="relative flex h-full min-h-96 flex-col overflow-hidden p-5">
        <div className="bg-purple-darker/20 absolute -top-20 -right-16 size-56 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70">
              <GithubIcon size={18} />
            </span>
            <div>
              <h3 className="text-sm font-extrabold">Recent Commits</h3>
              <p className="text-xs text-white/35">nijoow의 최근 공개 활동</p>
            </div>
          </div>
          <a
            href="https://github.com/nijoow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nijoow GitHub 프로필 열기"
            className="hover:border-purple-light/40 hover:text-purple-light focus-visible:ring-purple-light flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/45 transition-colors outline-none focus-visible:ring-2"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="relative mt-4 min-h-44 flex-1">
          {isPending ? (
            <div className="flex animate-pulse flex-col gap-2">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-2 py-2.5"
                >
                  <span className="size-9 rounded-lg bg-white/5" />
                  <span className="h-3 flex-1 rounded-full bg-white/5" />
                </div>
              ))}
            </div>
          ) : isError || !commits?.length ? (
            <div className="flex min-h-36 items-center justify-center text-center text-sm text-white/35">
              최근 커밋을 표시할 수 없습니다.
            </div>
          ) : (
            <div className="flex flex-col">
              {commits.map((commit) => (
                <CommitRow key={commit.sha} commit={commit} />
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-3 border-t border-white/10 pt-3">
          <div className="relative h-16 overflow-hidden rounded-xl bg-black/20 sm:h-20">
            <Image
              src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
              alt="GitHub 커밋 그래프 애니메이션"
              fill
              className="object-contain opacity-80"
              unoptimized
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
