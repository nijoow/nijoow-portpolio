import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return <TransitionPageWrapper>{children}</TransitionPageWrapper>;
}
