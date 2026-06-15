'use client';

import dynamic from 'next/dynamic';

const SignatureHero = dynamic(() => import('./SignatureHero'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export default SignatureHero;
