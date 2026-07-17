import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import type { Work } from '@/features/works/data/worksData';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface WorksBreadCrumbProps {
  /** worksData에 항목이 없는 페이지는 slug만으로 렌더링한다. */
  work: Work | undefined;
  slug: string;
}

function WorksBreadCrumb({ work, slug }: WorksBreadCrumbProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-1.5">
      <div className="text-purple-light/80 flex items-center gap-1 text-xs font-bold tracking-widest uppercase">
        <Link
          href="/works"
          className="focus-visible:ring-purple-light rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
        >
          Works
        </Link>
        <ChevronRight size={12} />
        <span className="text-white/60 normal-case">{slug}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-3xl font-black break-keep sm:text-4xl">
          {work?.name ?? slug}
        </h1>
        {work?.period && (
          <span className="text-sm text-white/60">{work.period}</span>
        )}
      </div>
      {work ? (
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <ProjectTypeChip
            projectType={work.projectType}
            isFreelance={work.isFreelance}
          />
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="from-purple-medium/70 mt-3 h-px w-full bg-linear-to-r to-transparent" />
    </div>
  );
}

export default WorksBreadCrumb;
