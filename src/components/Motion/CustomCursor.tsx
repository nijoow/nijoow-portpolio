'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Liquid trail tracking
  const trailX = useSpring(mouseX, { damping: 15, stiffness: 100, mass: 0.8 });
  const trailY = useSpring(mouseY, { damping: 15, stiffness: 100, mass: 0.8 });

  // Velocity for stretching
  const velX = useVelocity(mouseX);
  const velY = useVelocity(mouseY);

  const speed = useTransform([velX, velY], ([vx, vy]: number[]) =>
    Math.sqrt(vx * vx + vy * vy),
  );

  const scaleX = useTransform(speed, [0, 3000], [1, 1.6]);
  const scaleY = useTransform(speed, [0, 3000], [1, 0.6]);
  const rotate = useTransform(
    [velX, velY],
    ([vx, vy]: number[]) => (Math.atan2(vy, vx) * 180) / Math.PI,
  );

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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-9999 mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Liquid Trail / Lens */}
      <motion.div
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
        style={{
          x: trailX,
          y: trailY,
          scaleX: isHovering ? 2.5 : scaleX,
          scaleY: isHovering ? 2.5 : scaleY,
          rotate: isHovering ? 0 : rotate,
        }}
        animate={{
          backgroundColor: isHovering
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.2)',
          border: isHovering ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
          backdropFilter: isHovering ? 'blur(12px)' : 'blur(4px)',
        }}
      />

      {/* Center Dot  */}
      <motion.div
        className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
      />
    </div>
  );
};

export default CustomCursor;
