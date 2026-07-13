import Section from '@/components/Section/Section';
import { WorksGallery } from '@/features/works/components/WorksGallery';
import { Suspense } from 'react';

export default function ClassicWorks() {
  return (
    <Section>
      <div className="mb-2 flex w-full flex-col gap-1.5">
        <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
          Archived Project
        </span>
        <h1 className="text-3xl font-black sm:text-4xl">Works</h1>
        <p className="text-sm text-white/50">다양한 프로젝트들을 소개합니다.</p>
        <div className="from-purple-medium/70 mt-3 h-px w-full bg-linear-to-r to-transparent" />
      </div>
      <Suspense
        fallback={
          <div className="h-40 w-full animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        }
      >
        <WorksGallery />
      </Suspense>
    </Section>
  );
}
