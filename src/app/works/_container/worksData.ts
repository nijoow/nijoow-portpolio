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
}

export const works: Work[] = [
  {
    pageName: 'return-to-blank',
    name: 'return-to-blank',
    imgSrc: 'return-to-blank.webp',
    tags: ['Interactive', 'Side Project'],
    liveUrl: 'https://www.youtube.com/watch?v=11Wplgnpt90',
    repoUrl: 'https://github.com/nijoow/return-to-blank',
  },
  {
    pageName: 'memory',
    name: 'MEMORY',
    imgSrc: 'pnudt12.webp',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'Side Project'],
    liveUrl: 'https://nijoow.github.io/PNUDT12/pages/about.html',
    repoUrl: 'https://github.com/nijoow/PNUDT12',
  },
  {
    pageName: 'catch-the-candy',
    name: 'CATCH THE CANDY',
    imgSrc: 'catchTheCandy.webp',
    tags: ['Web', 'Interactive', 'Side Project'],
    liveUrl: 'https://nijoow.github.io/CatchTheCandy_p5/',
    repoUrl: 'https://github.com/nijoow/CatchTheCandy_p5',
  },
  {
    pageName: 'portfolio',
    name: 'portfolio',
    imgSrc: 'portfolio.webp',
    tags: ['Web', 'Interactive', 'Design', '3D', 'Side Project'],
    liveUrl: 'https://nijoow-portfolio.vercel.app',
    repoUrl: 'https://github.com/nijoow/nijoow.github.io',
  },
  {
    pageName: 'launchpad',
    name: 'launchpad',
    imgSrc: 'nijoow-launchpad.webp',
    tags: ['Web', 'Interactive', 'Frontend', 'Design', 'Side Project'],
    liveUrl: 'https://nijoow-launchpad.vercel.app/',
    repoUrl: 'https://github.com/nijoow/launchpad',
  },
  {
    pageName: 'treenow',
    name: 'Treenow',
    imgSrc: 'treenow.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
  },
  {
    pageName: 'svg-drawing',
    name: 'svg-drawing',
    imgSrc: 'nijoow-drawing.webp',
    tags: ['Web', 'Frontend', 'Interactive', 'Design', 'Side Project'],
    liveUrl: 'https://nijoow-drawing.vercel.app/',
    repoUrl: 'https://github.com/nijoow/svg-drawing',
  },
  {
    pageName: 'cusmetic',
    name: 'cusmetic',
    imgSrc: 'cusmetic.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
  },
  // {
  //   pageName: 'nijoow-shopping-mall',
  //   name: 'nijoow-shopping-mall',
  //   imgSrc: 'nijoow-shopping-mall.webp',
  //   tags: ['Web', 'Frontend', 'Backend', 'Design', 'Side Project'],
  //   liveUrl: 'https://nijoow-shopping-mall.vercel.app/',
  //   repoUrl: 'https://github.com/nijoow/shopping-mall',
  // },
  {
    pageName: 'moharu',
    name: 'moharu',
    imgSrc: 'moharu.webp',
    tags: ['Web', 'Frontend', 'Side Project'],
  },
  {
    pageName: 'atop-dms',
    name: 'ATOP.DMS',
    imgSrc: 'atop-dms/main.webp',
    tags: ['Web', 'Frontend', 'Business Project'],
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
    liveUrl: 'https://from-you.incheonilbo-interactive.com/',
  },
  {
    pageName: 'moimcity',
    name: '모임특별시',
    imgSrc: 'moimcity/moimcity.webp',
    tags: ['Web', 'Frontend', 'Business Project', 'Freelancer'],
  },
  {
    pageName: 'fromis9-stickers',
    name: '프로미스나인 스티커 꾸미기',
    imgSrc: 'fromis9-stickers.webp',
    tags: ['Web', 'Interactive', 'Design', 'Frontend', 'Side Project'],
    liveUrl: 'https://fromis9-stickers.vercel.app/',
  },
  {
    pageName: 'ml3yp',
    name: 'Midnight Lo-fi 3D Youtube Player',
    imgSrc: 'ml3yp.webp',
    tags: ['Web', 'Frontend', '3D', 'Interactive', 'Design', 'Side Project'],
    liveUrl: 'https://ml3yp.vercel.app/',
    repoUrl: 'https://github.com/nijoow/midnight-lofi-3d-youtube-player',
  },
  {
    pageName: 'lessor-panda-village',
    name: '레서판다 빌리지',
    imgSrc: 'lessor-panda-village.webp',
    tags: ['Web', 'Interactive', '3D', 'Side Project', 'Frontend'],
    liveUrl: 'https://lessor-panda-village.vercel.app/',
    repoUrl: 'https://github.com/nijoow/lessor-panda-village',
  },
];

export const getWork = (pageName: string): Work | undefined =>
  works.find((w) => w.pageName === pageName);
