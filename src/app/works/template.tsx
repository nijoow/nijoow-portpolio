import TransitionPageWrapper from '@/components/PageTransition/TransitionPageWrapper';
import type { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return <TransitionPageWrapper>{children}</TransitionPageWrapper>;
}
