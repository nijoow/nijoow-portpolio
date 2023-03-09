import React from 'react';

const SubTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex flex-col gap-0.5 mb-4">
      <span className="text-2xl font-bold">{title}</span>
      <div className="w-full h-[2px] bg-gray-dark dark:bg-white rounded-full" />
    </div>
  );
};

export default SubTitle;
