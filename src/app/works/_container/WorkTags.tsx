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
];

const WorkTags = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selectedTags = searchParams.getAll('tags');

  return (
    <div className="mb-2 flex w-full flex-wrap gap-1">
      {workFilterData.map((data) => (
        <button
          key={data}
          className={cn('rounded-md px-2 py-1 text-xs', {
            'bg-purple-regular text-white': selectedTags.includes(data),
            'bg-gray-300 text-gray-500': !selectedTags.includes(data),
          })}
          onClick={() => {
            const newTags = selectedTags.includes(data)
              ? selectedTags.filter((tag) => tag !== data)
              : [...selectedTags, data];
            const newParams = new URLSearchParams(
              newTags.map((tag) => ['tags', tag]),
            );

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
