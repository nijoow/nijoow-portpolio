import type { ProjectType } from '@/features/works/data/worksData';
import { cn } from '@/lib/utils';

interface ProjectTypeChipProps {
  projectType: ProjectType;
  isFreelance?: boolean;
}

const PROJECT_TYPE_STYLES: Record<ProjectType, string> = {
  business: 'border-brand-lavender/45 bg-brand-deep/90 text-brand-lavender',
  side: 'border-accent/40 bg-accent-deep/80 text-accent-light',
};

function getProjectTypeLabel(projectType: ProjectType, isFreelance: boolean) {
  if (projectType === 'side') return 'Side Project';
  return isFreelance ? 'Business Project (Freelancer)' : 'Business Project';
}

export function ProjectTypeChip({
  projectType,
  isFreelance = false,
}: ProjectTypeChipProps) {
  const label = getProjectTypeLabel(projectType, isFreelance);

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
