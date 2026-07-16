'use client';

import { GithubIcon } from '@/components/Icons/GithubIcon';
import GlassCard from '@/components/Motion/GlassCard';
import { useGithubActivity } from '@/features/home/hooks/useGithubActivity';
import type { GithubRepository } from '@/features/home/schemas/githubActivitySchemas';
import { ExternalLink, FolderGit2, Hammer, Star } from 'lucide-react';
import Image from 'next/image';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  month: 'short',
  day: 'numeric',
});

function RepositoryMeta({ repository }: { repository: GithubRepository }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/35">
      {repository.language ? (
        <span className="flex items-center gap-1.5">
          <span className="bg-purple-light size-1.5 rounded-full" />
          {repository.language}
        </span>
      ) : null}
      {repository.stars > 0 ? (
        <span className="flex items-center gap-1">
          <Star size={11} /> {repository.stars}
        </span>
      ) : null}
      <time dateTime={repository.pushedAt}>
        {dateFormatter.format(new Date(repository.pushedAt))} 업데이트
      </time>
    </span>
  );
}

function FeaturedRepository({ repository }: { repository: GithubRepository }) {
  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/featured border-purple-light/15 bg-purple-medium/10 hover:border-purple-light/35 focus-visible:ring-purple-light block rounded-2xl border p-4 transition-colors outline-none focus-visible:ring-2"
    >
      <span className="text-purple-light/75 mb-3 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
        <Hammer size={12} /> 최근 업데이트
      </span>
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="group-hover/featured:text-purple-light block truncate text-base font-black transition-colors">
            {repository.name}
          </span>
          <span className="mt-1 line-clamp-2 min-h-10 text-sm leading-relaxed text-white/45">
            {repository.description ?? '요즘 손보고 있는 프로젝트입니다.'}
          </span>
        </span>
        <ExternalLink className="size-4 shrink-0 text-white/25 transition-colors group-hover/featured:text-white/65" />
      </span>

      {repository.topics.length > 0 ? (
        <span className="mt-3 flex flex-wrap gap-1.5">
          {repository.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-white/45"
            >
              {topic}
            </span>
          ))}
        </span>
      ) : null}

      <span className="mt-3 block">
        <RepositoryMeta repository={repository} />
      </span>
    </a>
  );
}

function RepositoryRow({ repository }: { repository: GithubRepository }) {
  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/repo hover:border-purple-light/20 focus-visible:ring-purple-light flex min-w-0 items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition-colors outline-none focus-visible:ring-2"
    >
      <span className="bg-purple-medium/15 text-purple-light flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10">
        <FolderGit2 size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="group-hover/repo:text-purple-light block truncate text-sm font-bold transition-colors">
          {repository.name}
        </span>
        <RepositoryMeta repository={repository} />
      </span>
      <ExternalLink className="size-3.5 shrink-0 text-white/20 transition-colors group-hover/repo:text-white/60" />
    </a>
  );
}

function GithubActivitySkeleton() {
  return (
    <div className="mt-4 flex animate-pulse flex-col gap-3">
      <div className="h-36 rounded-2xl bg-white/5" />
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className="flex items-center gap-3 px-2 py-2.5">
          <span className="size-9 rounded-lg bg-white/5" />
          <span className="h-3 flex-1 rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  );
}

export function GithubActivity() {
  const { data: repositories, isPending, isError } = useGithubActivity();
  const featuredRepository = repositories?.[0];
  const recentRepositories = repositories?.slice(1, 3) ?? [];

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
              <h3 className="text-sm font-extrabold">최근 작업</h3>
              <p className="text-xs text-white/35">
                GitHub에서 최근 업데이트한 프로젝트
              </p>
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

        <div className="relative flex-1">
          {isPending ? (
            <GithubActivitySkeleton />
          ) : isError || !featuredRepository ? (
            <div className="flex min-h-56 items-center justify-center text-center text-sm text-white/35">
              GitHub 작업을 불러오지 못했습니다.
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-1">
              <FeaturedRepository repository={featuredRepository} />
              {recentRepositories.map((repository) => (
                <RepositoryRow key={repository.id} repository={repository} />
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-3 border-t border-white/10 pt-3">
          <div className="relative aspect-880/192 w-full overflow-hidden rounded-xl bg-black/20">
            <Image
              src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
              alt="GitHub 기여 그래프 애니메이션"
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
