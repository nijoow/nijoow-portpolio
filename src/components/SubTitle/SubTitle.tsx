import React from 'react';

const SubTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-0.5">
      <span className="text-lg font-bold sm:text-2xl">{title}</span>
      <div className="h-[2px] w-full rounded-full bg-gray-dark dark:bg-white" />
    </div>
  );
};

export default SubTitle;
