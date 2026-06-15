'use client';

import dynamic from 'next/dynamic';

const ImmersiveExperience = dynamic(() => import('./ImmersiveExperience'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-black" />,
});

export default ImmersiveExperience;
