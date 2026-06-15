'use client';
import { cn } from '@/lib/utils';
import { useQueryState } from 'nuqs';

const workFilterData = [
  'Web',
  'Design',
  'Frontend',
  'Interactive',
  '3D',
  'Backend',
  'Business Project',
  'Side Project',
  'Freelancer',
];

const WorkTags = () => {
  const [selectedTag, setSelectedTag] = useQueryState('tag', {
    history: 'replace',
  });

  return (
    <div className="mb-2 flex w-full flex-wrap gap-1">
      <button
        className={cn('rounded-md px-2 py-1 text-xs', {
          'bg-purple-regular text-white': selectedTag === null,
          'bg-gray-300 text-gray-500': selectedTag !== null,
        })}
        onClick={() => setSelectedTag(null)}
      >
        All
      </button>
      {workFilterData.map((data) => (
        <button
          key={data}
          className={cn('rounded-md px-2 py-1 text-xs', {
            'bg-purple-regular text-white': selectedTag === data,
            'bg-gray-300 text-gray-500': selectedTag !== data,
          })}
          onClick={() => setSelectedTag(data)}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default WorkTags;
