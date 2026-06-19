'use client';

import dynamic from 'next/dynamic';

const ParticleLogoBox = dynamic(() => import('./ParticleLogoBox'), {
  ssr: false,
  loading: () => (
    <div className="mb-8 h-[200px] w-full rounded-3xl border border-white/10 bg-black sm:h-[320px]" />
  ),
});

export default ParticleLogoBox;
