'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { type MouseEvent, type ReactNode, useRef } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

function Magnetic({ children, strength = 0.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });
  const y = useSpring(targetY, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;

    const { clientX, clientY } = event;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    targetX.set((clientX - centerX) * strength);
    targetY.set((clientY - centerY) * strength);
  };

  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </m.div>
  );
}

export default Magnetic;
