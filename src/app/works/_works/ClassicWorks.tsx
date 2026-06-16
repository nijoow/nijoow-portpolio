import Section from '@/components/Section/Section';
import Link from 'next/link';
import { Suspense } from 'react';
import WorkTags from '../_container/WorkTags';
import WorksList from '../_container/WorksList';

// 기존 Works 그리드(클래식 모드).
export default function ClassicWorks() {
  return (
    <Section>
      <div className="flex w-full flex-col gap-0.5">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <div className="bg-gray-dark h-0.5 w-full rounded-full dark:bg-white" />
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
