'use client';

import dynamic from 'next/dynamic';

const SignatureExperience = dynamic(() => import('./SignatureExperience'), {
  ssr: false,
  loading: () => (
    <div className="relative mb-10 h-[240px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black sm:h-[400px]" />
  ),
});

export default SignatureExperience;
