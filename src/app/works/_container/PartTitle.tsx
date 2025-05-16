import React from 'react';

const PartTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-lg font-semibold text-purple-medium dark:text-purple-regular">
      [{title}]
    </div>
  );
};

export default PartTitle;
