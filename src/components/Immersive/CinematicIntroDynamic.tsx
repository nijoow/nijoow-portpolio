'use client';

import dynamic from 'next/dynamic';

// 3D 인트로는 클라이언트 전용(ssr:false) + 청크 분리로 초기 번들에서 제외한다.
const CinematicIntro = dynamic(() => import('./CinematicIntro'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-100 bg-black" />,
});

export default CinematicIntro;
