import type { ProjectType, Work } from '@/features/works/data/worksData';

const PROJECT_TYPE_FILTERS: Readonly<Record<string, ProjectType | undefined>> =
  {
    'Business Project': 'business',
    'Side Project': 'side',
  };

export function filterWorksByTag(
  works: readonly Work[],
  selectedTag: string | null,
): readonly Work[] {
  if (selectedTag === null) return works;

  const projectType = PROJECT_TYPE_FILTERS[selectedTag];
  return projectType
    ? works.filter((work) => work.projectType === projectType)
    : works.filter((work) => work.tags.includes(selectedTag));
}
