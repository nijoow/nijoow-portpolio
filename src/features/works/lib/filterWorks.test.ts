import type { Work } from '@/features/works/data/worksData';
import { describe, expect, it } from 'vitest';
import { filterWorksByTag } from './filterWorks';

const works: readonly Work[] = [
  {
    pageName: 'business-web',
    name: 'Business Web',
    imgSrc: 'business.webp',
    projectType: 'business',
    tags: ['Web', 'Frontend'],
    status: 'published',
  },
  {
    pageName: 'side-3d',
    name: 'Side 3D',
    imgSrc: 'side.webp',
    projectType: 'side',
    tags: ['Web', '3D'],
    status: 'published',
  },
];

describe('filterWorksByTag', () => {
  it('필터가 없으면 원본 목록을 그대로 반환한다', () => {
    expect(filterWorksByTag(works, null)).toBe(works);
  });

  it.each([
    ['Business Project', ['business-web']],
    ['Side Project', ['side-3d']],
    ['Frontend', ['business-web']],
    ['3D', ['side-3d']],
    ['Backend', []],
  ])('%s 필터에 맞는 작업만 반환한다', (filter, expectedPageNames) => {
    expect(
      filterWorksByTag(works, filter).map((work) => work.pageName),
    ).toEqual(expectedPageNames);
  });
});
