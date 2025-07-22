'use client';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get('tag');

  return (
    <div className="mb-2 flex w-full flex-wrap gap-1">
      <button
        className={cn('rounded-md px-2 py-1 text-xs', {
          'bg-purple-regular text-white': selectedTag === null,
          'bg-gray-300 text-gray-500': selectedTag !== null,
        })}
        onClick={() => {
          router.replace(`${pathName}`);
        }}
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
          onClick={() => {
            const newParams = new URLSearchParams();
            newParams.set('tag', data);
            router.replace(`${pathName}?${newParams.toString()}`);
          }}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default WorkTags;
