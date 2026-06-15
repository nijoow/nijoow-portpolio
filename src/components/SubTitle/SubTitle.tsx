import React from 'react';

const SubTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-0.5">
      <span className="text-lg font-bold sm:text-2xl">{title}</span>
      <div className="bg-gray-dark h-0.5 w-full rounded-full dark:bg-white" />
    </div>
  );
};

export default SubTitle;
