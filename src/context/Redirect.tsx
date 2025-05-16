'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const Redirect = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const origin = typeof window !== undefined ? window.location.origin : '';

    if (origin === 'https://nijoow.github.io')
      router.push('https://nijoow-portfolio.vercel.app');
  }, []);

  return <>{children}</>;
};

export default Redirect;
