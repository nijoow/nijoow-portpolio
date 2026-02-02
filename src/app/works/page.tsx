import Section from '@/components/Section/Section';
import Link from 'next/link';
import { Suspense } from 'react';
import WorkTags from './_container/WorkTags';
import WorksList from './_container/WorksList';

const WorksPage = () => {
  return (
    <Section>
      <div className="flex w-full flex-col gap-0.5">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <div className="bg-gray-dark h-[2px] w-full rounded-full dark:bg-white" />
      </div>
      <Suspense fallback={<div>Loading tags...</div>}>
        <WorkTags />
      </Suspense>
      <Suspense fallback={<div>Loading works...</div>}>
        <WorksList />
      </Suspense>
    </Section>
  );
};

export default WorksPage;
