'use client';

import { cn } from '@/lib/utils';
import { m, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** 호버 시 살짝 떠오르는 효과. 긴 콘텐츠 패널은 끈다. */
  lift?: boolean;
}

// 마우스를 따라오는 퍼플 스포트라이트 + 보더 하이라이트를 주는 공용 글래스 패널.
// 뿌연 흰색 오버레이 대신 낮은 알파의 퍼플 라디얼만 얹어 유리 질감을 유지한다.
const GlassCard = ({ children, className, lift = true }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(192, 168, 235, 0.13), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
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
        'group/glass hover:border-purple-light/30 focus-within:border-purple-light/30 ease-emphasized relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl transition-[border-color,transform] duration-300',
        lift && 'hover:-translate-y-0.5',
        className,
      )}
    >
      <m.div
        aria-hidden
        className="ease-emphasized pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glass:opacity-100"
        style={{ backgroundImage: spotlight }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

export default GlassCard;
