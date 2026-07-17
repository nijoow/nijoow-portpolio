'use client';

import { FINE_POINTER_MEDIA_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import {
  m,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState } from 'react';

const CURSOR_SEGMENTS = [
  {
    size: 'h-8 w-8',
    offset: '-top-4 -left-4',
    spring: { damping: 20, stiffness: 400, mass: 0.2 },
  },
  {
    size: 'h-6 w-6',
    offset: '-top-3 -left-3',
    spring: { damping: 20, stiffness: 300, mass: 0.5 },
  },
  {
    size: 'h-5 w-5',
    offset: '-top-2.5 -left-2.5',
    spring: { damping: 25, stiffness: 200, mass: 0.8 },
  },
  {
    size: 'h-4 w-4',
    offset: '-top-2 -left-2',
    spring: { damping: 25, stiffness: 150, mass: 1.1 },
  },
  {
    size: 'h-3 w-3',
    offset: '-top-1.5 -left-1.5',
    spring: { damping: 30, stiffness: 100, mass: 1.4 },
  },
] as const;

interface CursorSegmentProps {
  index: number;
  isHovering: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  segment: (typeof CURSOR_SEGMENTS)[number];
}

function CursorSegment({
  index,
  isHovering,
  mouseX,
  mouseY,
  segment,
}: CursorSegmentProps) {
  const x = useSpring(mouseX, segment.spring);
  const y = useSpring(mouseY, segment.spring);
  const isMain = index === 0;
  const baseScale = 1 - index * 0.05;

  return (
    <m.div
      className={`bg-purple-light absolute rounded-full will-change-transform ${segment.offset} ${segment.size}`}
      style={{ x, y }}
      animate={{ scale: isHovering ? (isMain ? 2.5 : 0) : baseScale }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  );
}

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isNativeCursorTarget, setIsNativeCursorTarget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasFinePointer = useMediaQuery(FINE_POINTER_MEDIA_QUERY);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isEnabled = hasFinePointer && !prefersReducedMotion;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const target = event.target;
      const usesNativeCursor = Boolean(
        target.closest('input, textarea, select, [contenteditable="true"]'),
      );
      const isInteractive = Boolean(target.closest('a, button, canvas'));
      setIsNativeCursorTarget(usesNativeCursor);
      setIsHovering(isInteractive);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('blur', hideCursor);
    document.documentElement.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('blur', hideCursor);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <>
      <svg className="pointer-events-none absolute hidden h-0 w-0">
        <defs>
          <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="pointer-events-none fixed inset-0 z-9999 transition-opacity duration-300"
        style={{
          opacity:
            isVisible && !isNativeCursorTarget ? (isHovering ? 0.2 : 0.7) : 0,
          willChange: 'opacity',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            filter: 'url(#goo)',
            willChange: 'filter',
            transform: 'translateZ(0)',
          }}
        >
          {CURSOR_SEGMENTS.map((segment, index) => (
            <CursorSegment
              key={segment.size}
              index={index}
              isHovering={isHovering}
              mouseX={mouseX}
              mouseY={mouseY}
              segment={segment}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomCursor;
