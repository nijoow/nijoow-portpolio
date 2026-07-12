'use client';

import { AnimatePresence, m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { publicWorks } from '@/features/works/data/worksData';

const reversedWorks = [...publicWorks].reverse();

const WorksList = () => {
  const [selectedTag] = useQueryState('tag');

  const worksList = reversedWorks.filter(
    (work) => selectedTag === null || work.tags.includes(selectedTag),
  );

  return (
    <div className={'grid w-full grid-cols-1 gap-4 sm:grid-cols-2'}>
      <AnimatePresence mode="popLayout">
        {worksList.map((work) => (
          <m.div
            className="group hover:border-purple-light/40 relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors"
            key={work.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <Link
              href={`/works/${work.pageName}`}
              aria-label={`${work.name} 작업 상세 보기`}
              className="focus-visible:ring-purple-light flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                {work.imgSrc === '' ? (
                  <div>이미지가 없습니다</div>
                ) : (
                  <>
                    <Image
                      src={`/images/works/${work.imgSrc}`}
                      quality={10}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 448px"
                      className="object-cover blur-md"
                    />
                    <Image
                      src={`/images/works/${work.imgSrc}`}
                      fill
                      alt={`${work.name} 작업 미리보기`}
                      sizes="(max-width: 640px) 100vw, 448px"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </>
                )}
              </div>
              <div className="flex flex-auto flex-col gap-1.5 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="group-hover:text-purple-light truncate text-base font-extrabold transition-colors">
                    {work.name}
                  </span>
                  {work.period && (
                    <span className="shrink-0 text-xs text-white/40">
                      {work.period}
                    </span>
                  )}
                </div>
                {work.description && (
                  <p className="line-clamp-2 text-sm break-keep text-white/60">
                    {work.description}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-1 pt-1.5">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            {work.liveUrl && (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.name} 라이브 사이트 열기`}
                className="absolute top-3 right-3 z-20 flex size-8 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/70 hover:text-white focus-visible:opacity-100"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WorksList;
