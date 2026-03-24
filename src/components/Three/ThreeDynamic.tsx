'use client';

import dynamic from 'next/dynamic';

const ThreeDynamic = dynamic(() => import('./Three'), {
  ssr: false,
  loading: () => (
    <div className="mb-8 h-[200px] w-full rounded-3xl bg-white/5 sm:h-[320px]" />
  ),
});

export default ThreeDynamic;
