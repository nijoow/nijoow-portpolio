import { SELECTED_WORK_PAGE_NAMES } from '@/features/home/data/homeContent';
import { getWork, works } from '@/features/works/data/worksData';
import { describe, expect, it } from 'vitest';

describe('worksData', () => {
  it('제한 공개 프로젝트에는 실제 화면과 외부 링크를 노출하지 않는다', () => {
    const limitedWorks = works.filter((work) => work.disclosure === 'limited');

    expect(limitedWorks).toHaveLength(2);
    limitedWorks.forEach((work) => {
      expect(work.imgSrc).toBeUndefined();
      expect(work.liveUrl).toBeUndefined();
      expect(work.repoUrl).toBeUndefined();
      expect(work.status).toBe('published');
    });
  });

  it('일반 공개 프로젝트에는 카드에 사용할 이미지가 있다', () => {
    const fullyDisclosedWorks = works.filter(
      (work) => work.disclosure !== 'limited',
    );

    fullyDisclosedWorks.forEach((work) => {
      expect(work.imgSrc).toBeTruthy();
    });
  });

  it('홈 선택 프로젝트 네 개가 모두 공개된 작업으로 연결된다', () => {
    expect(SELECTED_WORK_PAGE_NAMES).toHaveLength(4);

    SELECTED_WORK_PAGE_NAMES.forEach((pageName) => {
      expect(getWork(pageName)?.status).toBe('published');
    });
  });
});
