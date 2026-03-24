'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const GreetingCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transformations for dynamic movement
  const blobX = useTransform(springX, [0, 1], ['10%', '-10%']);
  const blobY = useTransform(springY, [0, 1], ['10%', '-10%']);

  const cursorBlobX = useTransform(springX, [0, 1], ['0%', '100%']);
  const cursorBlobY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        'group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-xl transition-all hover:bg-white/10 sm:p-10 dark:border-white/20 dark:bg-white/5'
      }
    >
      {/* Specular Highlight / Sheen */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-50" />

      {/* Interactive Mouse Follower Blob */}
      <motion.div
        style={{
          left: cursorBlobX,
          top: cursorBlobY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="bg-purple-medium/20 pointer-events-none absolute -z-10 size-48 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
      />

      <motion.div
        style={{ x: blobX, y: blobY }}
        className={
          'bg-purple-light/20 pointer-events-none absolute -right-10 -bottom-10 -z-20 size-40 rounded-full blur-3xl'
        }
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div
        className={'relative z-10 text-center text-base break-keep sm:text-lg'}
      >
        반갑습니다🖐🏻 프론트엔드 개발자{' '}
        <span
          className={
            'text-purple-dark dark:text-purple-light relative inline-block text-xl font-black sm:text-2xl'
          }
        >
          이우진
          <motion.span
            className="bg-purple-medium/50 absolute -bottom-1 left-0 h-1 w-full blur-[2px]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </span>
        입니다.
      </div>
    </div>
  );
};

export default GreetingCard;
