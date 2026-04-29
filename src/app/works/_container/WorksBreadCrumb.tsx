import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

const WorksBreadCrumb = ({ subTitle }: { subTitle: string }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-0.5">
      <div className="flex items-center gap-2">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <ChevronRight size={24} />
        <span className="text-lg font-bold">{subTitle}</span>
      </div>
      <div className="h-[2px] w-full rounded-full bg-gray-dark dark:bg-white" />
    </div>
  );
};

export default WorksBreadCrumb;
