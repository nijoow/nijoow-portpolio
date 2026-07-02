'use client';

import { AnimatePresence, m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { works } from './worksData';
const reversedWorks = [...works].reverse();

const WorksList = () => {
  const [selectedTag] = useQueryState('tag');

  const worksList = reversedWorks.filter(
    (work) => selectedTag === null || work.tags.includes(selectedTag),
  );

  return (
    <div className={'grid w-full grid-cols-2 gap-3'}>
      <AnimatePresence mode="popLayout">
        {worksList.map((work) => (
          <m.div
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            className={`group relative col-span-2 aspect-video h-auto w-full overflow-hidden rounded-lg bg-white/80 shadow-md sm:col-span-1`}
            key={work.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            layout
          >
            {work.imgSrc === '' ? (
              <div>이미지가 없습니다</div>
            ) : (
              <>
                <Image
                  src={`/images/works/${work.imgSrc}`}
                  quality={10}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 336px"
                  className="object-cover blur-md"
                />
                <Image
                  src={`/images/works/${work.imgSrc}`}
                  fill
                  alt={`${work.name} 작업 미리보기`}
                  sizes="(max-width: 640px) 100vw, 336px"
                  className="object-contain"
                />
              </>
            )}
            <Link
              href={`/works/${work.pageName}`}
              aria-label={`${work.name} 작업 상세 보기`}
              className={`focus-visible:ring-purple-light absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-0.5 bg-black/70 px-3 text-center opacity-0 transition-all duration-300 outline-none group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-inset`}
            >
              <span className="text-lg text-white">{work.name} &gt;</span>
              {work.period && (
                <span className="text-xs text-white/60">{work.period}</span>
              )}
              {work.description && (
                <span className="line-clamp-2 text-xs text-white/70">
                  {work.description}
                </span>
              )}
            </Link>
            {work.liveUrl && (
              <a
                href={work.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work.name} 라이브 사이트 열기`}
                className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/70 hover:text-white focus-visible:opacity-100"
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
