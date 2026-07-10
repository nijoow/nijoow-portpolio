import type { Metadata } from 'next';
import ClassicWorks from './_works/ClassicWorks';

export const metadata: Metadata = {
  title: 'Works',
  description:
    'UI/UX, 인터랙션, 웹 3D를 중심으로 한 프론트엔드 개발자 이우진의 작업을 소개합니다.',
  alternates: { canonical: '/works' },
  openGraph: { url: '/works', title: 'Works' },
};

const WorksPage = () => {
  return <ClassicWorks />;
};

export default WorksPage;
