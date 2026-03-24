'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const GithubCommitLog = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

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
      className="group relative aspect-648/141 w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 shadow-lg backdrop-blur-xl transition-all dark:border-white/10"
    >
      {/* Specular Highlight */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 to-white/5 opacity-10" />

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
        className="bg-purple-light/20 pointer-events-none absolute -right-10 -bottom-10 -z-20 size-40 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative h-full w-full p-2 py-4 md:p-4">
        <Image
          src="https://raw.githubusercontent.com/nijoow/nijoow/output/snake.svg"
          alt="Commit Snake Animation"
          fill
          className="object-contain"
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default GithubCommitLog;
