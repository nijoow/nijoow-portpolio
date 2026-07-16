'use client';

import { FINE_POINTER_MEDIA_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CURSOR_SEGMENTS = [
  { size: 'h-8 w-8', offset: '-top-4 -left-4' },
  { size: 'h-6 w-6', offset: '-top-3 -left-3' },
  { size: 'h-5 w-5', offset: '-top-2.5 -left-2.5' },
  { size: 'h-4 w-4', offset: '-top-2 -left-2' },
  { size: 'h-3 w-3', offset: '-top-1.5 -left-1.5' },
] as const;

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hasFinePointer = useMediaQuery(FINE_POINTER_MEDIA_QUERY);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isEnabled = hasFinePointer && !prefersReducedMotion;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Define spring configs with increasing sluggishness for a "liquid" tail
  const spring1X = useSpring(mouseX, {
    damping: 20,
    stiffness: 400,
    mass: 0.2,
  });
  const spring1Y = useSpring(mouseY, {
    damping: 20,
    stiffness: 400,
    mass: 0.2,
  });

  const spring2X = useSpring(mouseX, {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  });
  const spring2Y = useSpring(mouseY, {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  });

  const spring3X = useSpring(mouseX, {
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  });
  const spring3Y = useSpring(mouseY, {
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  });

  const spring4X = useSpring(mouseX, {
    damping: 25,
    stiffness: 150,
    mass: 1.1,
  });
  const spring4Y = useSpring(mouseY, {
    damping: 25,
    stiffness: 150,
    mass: 1.1,
  });

  const spring5X = useSpring(mouseX, {
    damping: 30,
    stiffness: 100,
    mass: 1.4,
  });
  const spring5Y = useSpring(mouseY, {
    damping: 30,
    stiffness: 100,
    mass: 1.4,
  });

  const springsX = [spring1X, spring2X, spring3X, spring4X, spring5X];
  const springsY = [spring1Y, spring2Y, spring3Y, spring4Y, spring5Y];

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
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'CANVAS' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('canvas');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <>
      {/* SVG filter for the liquid/gooey effect */}
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
          opacity: isVisible ? (isHovering ? 0.2 : 0.7) : 0,
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
          {CURSOR_SEGMENTS.map((segment, index) => {
            const isMain = index === 0;
            const baseScale = 1 - index * 0.05;

            return (
              <m.div
                key={index}
                className={`bg-purple-light absolute rounded-full will-change-transform ${segment.offset} ${segment.size}`}
                style={{ x: springsX[index], y: springsY[index] }}
                animate={{ scale: isHovering ? (isMain ? 2.5 : 0) : baseScale }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
