'use client';

import { cn } from '@/lib/utils';
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { type MouseEvent, type ReactNode, useRef } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** 호버 시 살짝 떠오르는 효과. 긴 콘텐츠 패널은 끈다. */
  lift?: boolean;
}

// 모든 주요 카드가 공유하는 프로스티드 글래스 패널.
// 재질은 전역 frosted-glass 규칙에 두고, 여기서는 포인터 반응만 담당한다.
function GlassCard({ children, className, lift = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--color-brand-lavender) 11%, transparent), transparent 72%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'frosted-glass group/glass ease-emphasized focus-within:border-brand-lavender/25 hover:border-brand-lavender/20 relative overflow-hidden rounded-2xl border transition-[border-color,transform,box-shadow] duration-300 hover:shadow-2xl',
        lift && 'hover:-translate-y-0.5',
        className,
      )}
    >
      <div
        aria-hidden
        className="from-brand-lavender/0 via-brand-lavender/22 to-accent/0 pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r opacity-80"
      />
      <m.div
        aria-hidden
        className="ease-emphasized pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glass:opacity-100"
        style={{ backgroundImage: spotlight }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

export default GlassCard;
