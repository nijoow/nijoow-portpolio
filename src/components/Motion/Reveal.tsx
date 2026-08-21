'use client';

import { cn } from '@/lib/utils';
import { REVEAL_TRANSITION } from '@/lib/motion';
import { m } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...REVEAL_TRANSITION, delay }}
      className={cn('w-full', className)}
    >
      {children}
    </m.div>
  );
}

export default Reveal;
