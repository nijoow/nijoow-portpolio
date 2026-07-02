import Section from '@/components/Section/Section';
import { Suspense } from 'react';
import WorkTags from '../_container/WorkTags';
import WorksList from '../_container/WorksList';

// 기존 Works 그리드(클래식 모드).
export default function ClassicWorks() {
  return (
    <Section>
      <div className="mb-2 flex w-full flex-col gap-1.5">
        <span className="text-purple-light/80 text-xs font-bold tracking-widest uppercase">
          Selected Works
        </span>
        <h1 className="text-3xl font-black sm:text-4xl">Works</h1>
        <p className="text-sm text-white/50">
          웹·인터랙티브·3D를 넘나들며 만든 작업들입니다.
        </p>
        <div className="from-purple-medium/70 mt-3 h-px w-full bg-linear-to-r to-transparent" />
      </div>
      <Suspense fallback={<div>Loading tags...</div>}>
        <WorkTags />
      </Suspense>
      <Suspense fallback={<div>Loading works...</div>}>
        <WorksList />
      </Suspense>
    </Section>
  );
}
