'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import { publicWorks, type Work } from '@/features/works/data/worksData';
import { cn } from '@/lib/utils';
import { AnimatePresence, m, type Transition } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

const WORK_FILTER_TAGS = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'Backend',
  'Business Project',
  'Side Project',
];

const newestFirstWorks = [...publicWorks].reverse();
const CARD_INITIAL = { opacity: 0, y: 12, scale: 0.98 };
const CARD_ANIMATE = { opacity: 1, y: 0, scale: 1 };
const CARD_EXIT = { opacity: 0, scale: 0.96 };
const CARD_TRANSITION: Transition = { duration: 0.3, ease: 'easeOut' };

function WorkCard({ work, isFirst }: { work: Work; isFirst: boolean }) {
  return (
    <m.article
      layout
      initial={CARD_INITIAL}
      animate={CARD_ANIMATE}
      exit={CARD_EXIT}
      transition={CARD_TRANSITION}
      className="min-w-0"
    >
      <GlassCard className="group/work h-full">
        <Link
          href={`/works/${work.pageName}`}
          aria-label={`${work.name} 작업 상세 보기`}
          className="focus-visible:ring-brand-lavender flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          <div className="from-atmosphere-navy/20 relative aspect-video w-full overflow-hidden border-b border-white/10 bg-linear-to-br via-black/20 to-white/5">
            <Image
              src={`/images/works/${work.imgSrc}`}
              alt={`${work.name} 작업 미리보기`}
              fill
              loading={isFirst ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-contain transition-transform duration-500 group-hover/work:scale-105"
            />
            <span className="absolute top-3 left-3">
              <ProjectTypeChip
                projectType={work.projectType}
                isFreelance={work.isFreelance}
              />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="group-hover/work:text-brand-lavender truncate text-lg font-black text-white/90 transition-colors">
                  {work.name}
                </h2>
                {work.description ? (
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed break-keep text-white/55">
                    {work.description}
                  </p>
                ) : null}
              </div>
              <span className="group-hover/work:border-brand-lavender/40 group-hover/work:text-brand-lavender flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/45 transition-colors">
                <ArrowUpRight size={14} />
              </span>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
              {work.period ? (
                <span className="ml-auto text-xs text-white/55">
                  {work.period}
                </span>
              ) : null}
            </div>
          </div>
        </Link>

        {work.liveUrl ? (
          <a
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${work.name} 라이브 사이트 열기`}
            className="focus-visible:ring-brand-lavender absolute top-3 right-3 z-20 flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/80 opacity-100 backdrop-blur-sm transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none sm:opacity-0 sm:group-focus-within/work:opacity-100 sm:group-hover/work:opacity-100"
          >
            <ExternalLink size={15} />
          </a>
        ) : null}
      </GlassCard>
    </m.article>
  );
}

export function WorksGallery() {
  const [selectedTag, setSelectedTag] = useQueryState('tag', {
    history: 'replace',
  });
  const filteredWorks = newestFirstWorks.filter((work) => {
    if (selectedTag === null) return true;
    if (selectedTag === 'Business Project') {
      return work.projectType === 'business';
    }
    if (selectedTag === 'Side Project') return work.projectType === 'side';
    return work.tags.includes(selectedTag);
  });

  function getFilterClass(isActive: boolean): string {
    return cn(
      'min-h-11 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender',
      isActive
        ? 'border-brand-lavender/35 bg-brand-deep/55 text-white'
        : 'border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:bg-white/8 hover:text-white',
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        role="group"
        aria-label="작업 태그 필터"
        className="flex flex-wrap gap-1.5"
      >
        <button
          type="button"
          aria-pressed={selectedTag === null}
          onClick={() => setSelectedTag(null)}
          className={getFilterClass(selectedTag === null)}
        >
          All
        </button>
        {WORK_FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
            className={getFilterClass(selectedTag === tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <m.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredWorks.map((work, index) => (
            <WorkCard key={work.pageName} work={work} isFirst={index === 0} />
          ))}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
