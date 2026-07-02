import React from 'react';

const PartTitle = ({ title }: { title: string }) => {
  return (
    <div className="mt-6 mb-2 flex items-center gap-2.5">
      <span className="from-purple-light to-purple-medium h-4.5 w-1 rounded-full bg-linear-to-b" />
      <span className="text-xl font-black">{title}</span>
    </div>
  );
};

export default PartTitle;
