import type { ProjectType } from '@/features/works/data/worksData';
import { cn } from '@/lib/utils';

interface ProjectTypeChipProps {
  projectType: ProjectType;
  isFreelance?: boolean;
}

const PROJECT_TYPE_STYLES: Record<ProjectType, string> = {
  business: 'border-purple-light/45 bg-purple-darker/90 text-purple-light',
  side: 'border-white/20 bg-cosmic-navy/90 text-white/75',
};

export function ProjectTypeChip({
  projectType,
  isFreelance = false,
}: ProjectTypeChipProps) {
  const label =
    projectType === 'business'
      ? `Business Project${isFreelance ? ' (Freelancer)' : ''}`
      : 'Side Project';

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider whitespace-nowrap backdrop-blur-sm',
        PROJECT_TYPE_STYLES[projectType],
      )}
    >
      {label}
    </span>
  );
}
