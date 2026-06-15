'use client';

import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const LEGACY_ORIGIN = 'https://nijoow.github.io';
const CANONICAL_URL = 'https://nijoow-portfolio.vercel.app';

const Redirect = ({ children }: Props) => {
  useEffect(() => {
    if (window.location.origin === LEGACY_ORIGIN) {
      window.location.replace(CANONICAL_URL);
    }
  }, []);

  return <>{children}</>;
};

export default Redirect;
