'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default Theme;
