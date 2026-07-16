'use client';

import { cn } from '@/lib/utils';
import { REVEAL_TRANSITION } from '@/lib/motion';
import { m } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// 스크롤 진입 시 아래에서 떠오르는 공용 리빌 래퍼.
// reduced-motion은 루트 MotionConfig(reducedMotion="user")가 일괄 처리한다.
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
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
};

export default Reveal;
