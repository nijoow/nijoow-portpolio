'use client';

import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';

interface StarParticle {
  id: number;
  left: string;
  top: string;
  opacity: number;
  size: number;
  duration: number;
  delay: number;
}

function seededValue(index: number, salt: number) {
  const value = Math.sin(index * 91.37 + salt * 47.11) * 10000;
  return value - Math.floor(value);
}

const STAR_PARTICLES: StarParticle[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: index,
    left: `${seededValue(index, 1) * 100}%`,
    top: `${seededValue(index, 2) * 100}%`,
    opacity: 0.18 + seededValue(index, 3) * 0.48,
    size: 1 + seededValue(index, 4) * 1.6,
    duration: 5 + seededValue(index, 5) * 7,
    delay: seededValue(index, 6) * 4,
  }),
);

export const AmbientBackground = () => {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 45, damping: 24 });
  const blobX1 = useTransform(smoothPointerX, (value) => value * -0.75);
  const blobX2 = useTransform(smoothPointerX, (value) => value * 0.5);
  const blobX3 = useTransform(smoothPointerX, (value) => value * -0.35);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 64);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, shouldReduceMotion]);

  return (
    <div className="bg-cosmic-ink pointer-events-none fixed inset-0 -z-20 overflow-hidden select-none">
      <div className="cosmic-stars absolute inset-0 opacity-75" />
      <div className="cosmic-grid absolute inset-0 opacity-35" />

      <m.div
        style={{ x: blobX1, y: y1 }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.58, 0.78, 0.58] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-cosmic-violet/55 absolute -top-32 -left-40 size-[34rem] rounded-full blur-3xl"
      />
      <m.div
        style={{ x: blobX2, y: y2 }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1.08, 0.96, 1.08], opacity: [0.42, 0.68, 0.42] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-cosmic-navy/70 absolute top-[24%] -right-56 size-[42rem] rounded-full blur-3xl"
      />
      <m.div
        style={{ x: blobX3, y: y3 }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [0.96, 1.1, 0.96], opacity: [0.38, 0.6, 0.38] }
        }
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-purple-darker/35 absolute top-[62%] left-[4%] size-[38rem] rounded-full blur-3xl"
      />

      <m.div
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="border-purple-light/10 absolute top-[10%] left-[55%] size-96 -translate-x-1/2 rounded-full border"
      >
        <span className="bg-purple-light absolute top-1/2 -left-1 size-2 rounded-full opacity-50" />
      </m.div>
      <m.div
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
        className="border-purple-medium/10 absolute top-[48%] -left-28 size-[30rem] rounded-full border"
      >
        <span className="bg-purple-medium absolute right-16 bottom-6 size-1.5 rounded-full opacity-45" />
      </m.div>

      {STAR_PARTICLES.map((particle) => (
        <m.span
          key={particle.id}
          initial={{ opacity: particle.opacity * 0.45 }}
          animate={
            shouldReduceMotion
              ? { opacity: particle.opacity }
              : {
                  y: [-5, 7, -5],
                  opacity: [
                    particle.opacity * 0.45,
                    particle.opacity,
                    particle.opacity * 0.45,
                  ],
                }
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
          className="bg-purple-light absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <div className="cosmic-vignette absolute inset-0" />
      <div className="from-cosmic-ink absolute inset-x-0 bottom-0 h-48 bg-linear-to-t to-transparent" />
    </div>
  );
};
