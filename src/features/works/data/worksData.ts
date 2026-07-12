// 작업 데이터 — 카드/목록과 구조화에 쓰이는 단일 소스(Single Source of Truth).
// 선택 필드(description·role·period·repoUrl)는 채우는 즉시 UI에 반영됩니다(비어 있으면 렌더 안 함).
// 채우기 예시:
//   {
//     pageName: 'treenow',
//     name: 'Treenow',
//     imgSrc: 'treenow.webp',
//     tags: ['Web', 'Frontend', 'Business Project'],
//     description: '한 줄 소개 — 문제/역할/성과를 간결하게',
//     role: 'Frontend',
//     period: '2024.01 – 2024.03',
//     liveUrl: 'https://...',
//     repoUrl: 'https://github.com/nijoow/...',
//   },
export interface Work {
  pageName: string;
  name: string;
  imgSrc: string;
  tags: string[];
  /** 한 줄 소개(문제·역할·성과). 채우면 카드/목록에 노출. */
  description?: string;
  /** 담당 역할 요약(예: 'Frontend'). */
  role?: string;
  /** 진행 기간(예: '2024.01 – 2024.03'). */
  period?: string;
  /** 라이브 사이트/데모 URL. */
  liveUrl?: string;
  /** 소스 저장소 URL. */
  repoUrl?: string;
  /** 공개 상태. draft는 목록·sitemap에서 제외하고 noindex 처리한다. */
  status: 'published' | 'archive' | 'draft';
}

export const works: Work[] = [
  {
    pageName: 'return-to-blank',
    name: 'return-to-blank',
    imgSrc: 'return-to-blank.webp',
    tags: ['Interactive', 'Side Project'],
    description:
      'Kinect 카메라와 Unity를 활용해 선행성 기억상실증을 표현한 졸업전시 인터랙티브 미디어아트',
    role: 'Interactive Art',
    period: '2021.',
    liveUrl: 'https://www.youtube.com/watch?v=11Wplgnpt90',
    repoUrl: 'https://github.com/nijoow/return-to-blank',
    status: 'published',
  },
  {
    pageName: 'memory',
    name: 'MEMORY',
    imgSrc: 'pnudt12.webp',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'Side Project'],
    description:
      '가로 스크롤과 인터랙티브 요소를 활용한 부산대학교 디자인앤테크놀로지 졸업전시회 아카이브 웹사이트',
    role: 'Design & Publishing',
    period: '2021.',
    liveUrl: 'https://nijoow.github.io/PNUDT12/pages/about.html',
    repoUrl: 'https://github.com/nijoow/PNUDT12',
    status: 'published',
  },
  {
    pageName: 'catch-the-candy',
    name: 'CATCH THE CANDY',
    imgSrc: 'catchTheCandy.webp',
    tags: ['Web', 'Interactive', 'Side Project'],
    description:
      '편향(Bias)이라는 주제를 담아 Processing/Arduino 작품을 p5.js 웹 게임으로 구현한 인터랙티브 아트',
    role: 'Game Dev & Interactive',
    period: '2021.',
    liveUrl: 'https://nijoow.github.io/CatchTheCandy_p5/',
    repoUrl: 'https://github.com/nijoow/CatchTheCandy_p5',
    status: 'published',
  },
  {
    pageName: 'portfolio',
    name: 'portfolio',
    imgSrc: 'portfolio.webp',
    tags: ['Web', 'Interactive', 'Design', '3D', 'Side Project'],
    description: '개인 포트폴리오 웹사이트',
    role: 'Frontend & Design',
    period: '2022. ~',
    liveUrl: 'https://nijoow-portfolio.vercel.app',
    repoUrl: 'https://github.com/nijoow/nijoow.github.io',
    status: 'published',
  },
  {
    pageName: 'launchpad',
    name: 'launchpad',
    imgSrc: 'nijoow-launchpad.webp',
    tags: ['Web', 'Interactive', 'Frontend', 'Design', 'Side Project'],
    description: '웹 브라우저 기반의 런치패드 악기 연주 토이 프로젝트',
    role: 'Frontend & Design',
    liveUrl: 'https://nijoow-launchpad.vercel.app/',
    repoUrl: 'https://github.com/nijoow/launchpad',
    status: 'published',
  },
  {
    pageName: 'treenow',
    name: 'Treenow',
    imgSrc: 'treenow.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
    description: 'B2B 조경 수목 거래 하이브리드 앱 플랫폼',
    role: 'Frontend & Hybrid App',
    period: '2022.09 ~ 2023.01',
    status: 'published',
  },
  {
    pageName: 'svg-drawing',
    name: 'svg-drawing',
    imgSrc: 'nijoow-drawing.webp',
    tags: ['Web', 'Frontend', 'Interactive', 'Design', 'Side Project'],
    description: 'SVG 기반 벡터 드로잉 웹 어플리케이션',
    role: 'Frontend & Math Calc',
    liveUrl: 'https://nijoow-drawing.vercel.app/',
    repoUrl: 'https://github.com/nijoow/svg-drawing',
    status: 'published',
  },
  {
    pageName: 'cusmetic',
    name: 'cusmetic',
    imgSrc: 'cusmetic.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
    description: '맞춤형 피부타입 진단 및 화장품 추천 서비스',
    role: 'Frontend Development',
    period: '2023.10 ~ 2024.01',
    status: 'published',
  },
  {
    pageName: 'nijoow-shopping-mall',
    name: 'nijoow-shopping-mall',
    imgSrc: 'nijoow-shopping-mall.webp',
    tags: ['Web', 'Frontend', 'Backend', 'Design', 'Side Project'],
    description:
      '회원가입과 소셜 로그인, 상품·배송·좋아요 기능을 구현하는 Next.js·PostgreSQL 기반 쇼핑몰 프로젝트',
    role: 'Full Stack Development',
    period: '2024.08 ~',
    liveUrl: 'https://nijoow-shopping-mall.vercel.app/',
    repoUrl: 'https://github.com/nijoow/shopping-mall',
    status: 'draft',
  },
  {
    pageName: 'moharu',
    name: 'moharu',
    imgSrc: 'moharu.webp',
    tags: ['Web', 'Frontend', 'Side Project'],
    description: '비사이드 포텐데이 해커톤에서 진행한 취미 활동 추천 서비스',
    role: 'Frontend & Deployment',
    status: 'published',
  },
  {
    pageName: 'atop-dms',
    name: 'ATOP.DMS',
    imgSrc: 'atop-dms/main.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
    description: '기업 맞춤형 데이터 관리 시스템 SaaS',
    role: 'Frontend Development',
    period: '2024.05 ~ 2024.12',
    status: 'published',
  },
  {
    pageName: 'fromyou',
    name: '독자시점주의 From You',
    imgSrc: 'fromyou.webp',
    tags: [
      'Web',
      'Frontend',
      'Interactive',
      'Design',
      'Business Project',
      'Freelancer',
    ],
    description: '인천일보 인터랙티브 스크롤텔링 웹사이트',
    role: 'Design & Frontend',
    period: '2025.04 ~ 2025.12',
    liveUrl: 'https://from-you.incheonilbo-interactive.com/',
    status: 'published',
  },
  {
    pageName: 'moimcity',
    name: '모임특별시',
    imgSrc: 'moimcity/moimcity.webp',
    tags: ['Web', 'Frontend', 'Business Project', 'Freelancer'],
    description: '취향 기반 소셜 모임 플랫폼',
    role: 'Frontend & Refactoring',
    period: '2025.10 ~ 2025.11',
    status: 'published',
  },
  {
    pageName: 'fromis9-stickers',
    name: '프로미스나인 스티커 꾸미기',
    imgSrc: 'fromis9-stickers.webp',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'Side Project'],
    description: '팬덤용 스티커 꾸미기 웹사이트',
    role: 'Design & Frontend',
    liveUrl: 'https://fromis9-stickers.vercel.app/',
    status: 'published',
  },
  {
    pageName: 'ml3yp',
    name: 'Midnight Lo-fi 3D Youtube Player',
    imgSrc: 'ml3yp.webp',
    tags: ['Web', 'Frontend', '3D', 'Interactive', 'Design', 'Side Project'],
    description: '몰입형 3D 가상 공간 속 YouTube 플레이리스트 플레이어',
    role: 'Design & Development',
    liveUrl: 'https://ml3yp.vercel.app/',
    repoUrl: 'https://github.com/nijoow/midnight-lofi-3d-youtube-player',
    status: 'published',
  },
  {
    pageName: 'lessor-panda-village',
    name: '레서판다 빌리지',
    imgSrc: 'lessor-panda-village.webp',
    tags: ['Web', 'Interactive', '3D', 'Side Project', 'Frontend'],
    description: '3D 캐릭터 기반 실시간 멀티플레이어 레서판다 마을',
    role: 'Design & Development',
    period: '2026.03',
    liveUrl: 'https://lessor-panda-village.vercel.app/',
    repoUrl: 'https://github.com/nijoow/lessor-panda-village',
    status: 'published',
  },
];

export const publicWorks = works.filter((work) => work.status !== 'draft');

export const getWork = (pageName: string): Work | undefined =>
  works.find((w) => w.pageName === pageName);

export const getWorks = (pageNames: readonly string[]): Work[] =>
  pageNames.flatMap((pageName) => {
    const work = getWork(pageName);
    return work ? [work] : [];
  });
