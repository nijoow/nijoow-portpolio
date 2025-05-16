import Section from '@/components/Section/Section';
import Link from 'next/link';
import WorkTags from './_container/WorkTags';
import WorksList from './_container/WorksList';

const WorksPage = () => {
  return (
    <Section>
      <div className="flex w-full flex-col gap-0.5">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <div className="h-[2px] w-full rounded-full bg-gray-dark dark:bg-white" />
      </div>
      <WorkTags />
      <WorksList />
    </Section>
  );
};

export default WorksPage;
