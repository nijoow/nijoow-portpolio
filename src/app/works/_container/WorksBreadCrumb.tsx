import Eyebrow from '@/components/ui/Eyebrow';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import type { Work } from '@/features/works/data/worksData';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface WorksBreadCrumbProps {
  work: Work | undefined;
  slug: string;
}

function WorksBreadCrumb({ work, slug }: WorksBreadCrumbProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-1.5">
      <Eyebrow className="flex items-center gap-1">
        <Link
          href="/works"
          className="focus-visible:ring-brand-lavender rounded-sm transition-colors outline-none hover:text-white focus-visible:ring-2"
        >
          Works
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink-muted normal-case">{slug}</span>
      </Eyebrow>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-3xl font-bold break-keep sm:text-4xl">
          {work?.name ?? slug}
        </h1>
        {work?.period && (
          <span className="text-ink-muted text-sm">{work.period}</span>
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
              className="text-ink-muted rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="from-brand-muted/45 mt-3 h-px w-full bg-linear-to-r to-transparent" />
    </div>
  );
}

export default WorksBreadCrumb;
