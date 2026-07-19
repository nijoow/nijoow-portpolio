import Section from '@/components/Section/Section';
import { WorksGallery } from '@/features/works/components/WorksGallery';
import { WorksGallerySkeleton } from '@/features/works/components/WorksGallerySkeleton';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

export default function ClassicWorks() {
  return (
    <Section>
      <div className="mb-2 flex w-full flex-col gap-1.5">
        <span className="text-brand-lavender/70 text-xs font-bold tracking-widest uppercase">
          Archived Project
        </span>
        <h1 className="text-3xl font-black sm:text-4xl">Works</h1>
        <p className="text-sm text-white/50">다양한 프로젝트들을 소개합니다.</p>
        <div className="from-brand-muted/45 mt-3 h-px w-full bg-linear-to-r to-transparent" />
      </div>
      <NuqsAdapter>
        <Suspense fallback={<WorksGallerySkeleton />}>
          <WorksGallery />
        </Suspense>
      </NuqsAdapter>
    </Section>
  );
}
