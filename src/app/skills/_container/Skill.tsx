'use client';

import { prefix } from '@/config/config';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export interface SkillType {
  fileName: string;
  name: string;
}

interface SkillProps extends SkillType {
  constraintsRef: React.MutableRefObject<null>;
}

const Skill = ({ fileName, name, constraintsRef }: SkillProps) => {
  const controls = useAnimationControls();

  useEffect(() => {
    window.addEventListener('resize', resetMotionDiv);
    return () => window.removeEventListener('resize', resetMotionDiv);
  }, []);

  const resetMotionDiv = () => {
    controls.set({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={controls}
      drag
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      dragConstraints={constraintsRef}
      dragSnapToOrigin
      className="col-span-2 flex cursor-pointer flex-col items-center gap-2 sm:col-span-1"
    >
      <Tilt
        scale={1.2}
        className={`relative h-16 w-16 overflow-hidden rounded-lg transition-all duration-300 ${
          name === 'NEXT JS' ? 'bg-transparent p-2 dark:bg-purple-50' : ''
        }`}
      >
        <Image
          src={`${prefix}/images/skills/${fileName}`}
          alt={fileName}
          fill
          className={`pointer-events-none ${name === 'NEXT JS' ? 'p-1' : ''}`}
        />
      </Tilt>

      <span className={'font-semibold'}>{name}</span>
    </motion.div>
  );
};
export default Skill;
