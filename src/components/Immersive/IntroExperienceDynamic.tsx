'use client';

import dynamic from 'next/dynamic';

const IntroExperience = dynamic(() => import('./IntroExperience'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-black" />,
});

export default IntroExperience;
