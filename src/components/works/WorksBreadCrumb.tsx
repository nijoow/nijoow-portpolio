import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const WorksBreadCrumb = ({ subTitle }: { subTitle: string }) => {
  return (
    <div className="w-full flex flex-col gap-0.5 mb-4">
      <div className="flex items-center gap-2">
        <Link href="/works" className="text-2xl font-bold">
          Works
        </Link>
        <FiChevronRight size={24} />
        <span className="text-lg font-bold">{subTitle}</span>
      </div>
      <div className="w-full h-[2px] bg-gray-dark dark:bg-white rounded-full" />
    </div>
  );
};

export default WorksBreadCrumb;
