'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

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
          {springsX.map((_, index) => {
            const isMain = index === 0;
            // Progressively smaller sizes for physical teardrop effect
            const sizes = [
              'h-8 w-8',
              'h-6 w-6',
              'h-5 w-5',
              'h-4 w-4',
              'h-3 w-3',
            ];
            const offsets = [
              '-top-4 -left-4',
              '-top-3 -left-3',
              '-top-[10px] -left-[10px]',
              '-top-2 -left-2',
              '-top-[6px] -left-[6px]',
            ];

            const sizeClass = sizes[index];
            const offset = offsets[index];
            const baseScale = 1 - index * 0.05;

            return (
              <motion.div
                key={index}
                className={cn(
                  `absolute ${offset} ${sizeClass} bg-purple-light rounded-full will-change-transform`,
                )}
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
