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

  const tagClass = (isActive: boolean) =>
    cn(
      'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
      isActive
        ? 'border-purple-light/40 bg-purple-medium text-white'
        : 'border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white',
    );

  return (
    <div className="mb-4 flex w-full flex-wrap gap-1.5">
      <button
        className={tagClass(selectedTag === null)}
        onClick={() => setSelectedTag(null)}
      >
        All
      </button>
      {workFilterData.map((data) => (
        <button
          key={data}
          className={tagClass(selectedTag === data)}
          onClick={() => setSelectedTag(data)}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default WorkTags;
