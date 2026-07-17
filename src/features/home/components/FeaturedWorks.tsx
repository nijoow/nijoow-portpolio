import GlassCard from '@/components/Motion/GlassCard';
import SubTitle from '@/components/SubTitle/SubTitle';
import { ProjectTypeChip } from '@/features/works/components/ProjectTypeChip';
import type { Work } from '@/features/works/data/worksData';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedWorksProps {
  works: readonly Work[];
}

function FeaturedWorkCard({ work }: { work: Work }) {
  return (
    <GlassCard className="group/work h-full">
      <Link
        href={`/works/${work.pageName}`}
        aria-label={`${work.name} 작업 상세 보기`}
        className="focus-visible:ring-purple-light flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset"
      >
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-black/30">
          <Image
            src={`/images/works/${work.imgSrc}`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 424px"
            className="scale-110 object-cover opacity-25 blur-xl"
          />
          <Image
            src={`/images/works/${work.imgSrc}`}
            alt={`${work.name} 작업 미리보기`}
            fill
            sizes="(max-width: 768px) 100vw, 424px"
            className="object-contain transition-transform duration-500 group-hover/work:scale-105"
          />
          <span className="absolute top-3 left-3">
            <ProjectTypeChip
              projectType={work.projectType}
              isFreelance={work.isFreelance}
            />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="group-hover/work:text-purple-light truncate text-lg font-black transition-colors sm:text-xl">
                {work.name}
              </h2>
              {work.description ? (
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed break-keep text-white/50">
                  {work.description}
                </p>
              ) : null}
            </div>
            <span className="group-hover/work:border-purple-light/40 group-hover/work:text-purple-light flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/45 transition-colors">
              <ArrowUpRight size={14} />
            </span>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
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
    </GlassCard>
  );
}

export function FeaturedWorks({ works }: FeaturedWorksProps) {
  return (
    <section className="w-full">
      <div className="flex items-end justify-between gap-4">
        <SubTitle eyebrow="Featured Projects" title="주요 작업" />
        <Link
          href="/works"
          className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 mb-6 flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold text-white/70 backdrop-blur-xl transition-colors hover:text-white"
        >
          모든 작업 보기
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {works.map((work) => (
          <FeaturedWorkCard key={work.pageName} work={work} />
        ))}
      </div>
    </section>
  );
}
