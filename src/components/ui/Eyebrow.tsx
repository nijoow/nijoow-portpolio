import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type EyebrowTone = 'brand' | 'accent' | 'muted';

const TONE_CLASS: Record<EyebrowTone, string> = {
  brand: 'text-brand-lavender/70',
  accent: 'text-accent-light/80',
  muted: 'text-ink-muted',
};

interface EyebrowProps {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
}

function Eyebrow({ children, tone = 'brand', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'text-[11px] font-bold tracking-widest uppercase',
        TONE_CLASS[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Eyebrow;
