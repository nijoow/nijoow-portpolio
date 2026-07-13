'use client';

import GlassCard from '@/components/Motion/GlassCard';
import {
  m,
  type TargetAndTransition,
  type Transition,
  useReducedMotion,
} from 'framer-motion';
import Image from 'next/image';

type InterestMotion = 'float' | 'bounce' | 'pulse';

interface Interest {
  label: string;
  englishLabel: string;
  icon: string;
  motion: InterestMotion;
}

const interests: Interest[] = [
  {
    label: '커피',
    englishLabel: 'Coffee',
    icon: '/images/icons/coffee.svg',
    motion: 'float',
  },
  {
    label: '농구',
    englishLabel: 'Basketball',
    icon: '/images/icons/basketball.svg',
    motion: 'bounce',
  },
  {
    label: '힙합',
    englishLabel: 'Hip-hop',
    icon: '/images/icons/hiphop.svg',
    motion: 'pulse',
  },
];

const interestAnimations: Record<InterestMotion, TargetAndTransition> = {
  float: { y: [0, -6, 0], rotate: [0, -2, 2, 0] },
  bounce: { y: [0, -12, 0], rotate: [0, 7, 0] },
  pulse: { scale: [1, 1.08, 1], y: [0, -2, 0] },
};

const interestTransitions: Record<InterestMotion, Transition> = {
  float: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
  bounce: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  pulse: { duration: 1.35, repeat: Infinity, ease: 'easeInOut' },
};

const INTEREST_HOVER: TargetAndTransition = { y: -4 };

function InterestObject({
  interest,
  shouldReduceMotion,
}: {
  interest: Interest;
  shouldReduceMotion: boolean;
}) {
  return (
    <m.article
      whileHover={shouldReduceMotion ? undefined : INTEREST_HOVER}
      className="group/interest relative flex min-h-32 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-black/20 px-4 py-5"
    >
      <span
        aria-hidden="true"
        className="bg-purple-medium/20 absolute size-20 rounded-full blur-2xl transition-transform duration-500 group-hover/interest:scale-125"
      />
      <span
        aria-hidden="true"
        className="border-purple-light/15 absolute size-20 rounded-full border border-dashed"
      />
      <m.div
        animate={
          shouldReduceMotion ? undefined : interestAnimations[interest.motion]
        }
        transition={interestTransitions[interest.motion]}
        className="relative flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm"
      >
        <Image
          src={interest.icon}
          alt=""
          width={42}
          height={42}
          className="size-11"
        />
      </m.div>
      <span className="relative text-center">
        <span className="block text-sm font-extrabold">{interest.label}</span>
        <span className="mt-0.5 block text-[10px] font-bold tracking-widest text-white/30 uppercase">
          {interest.englishLabel}
        </span>
      </span>
    </m.article>
  );
}

export function PersonalInterests() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <GlassCard lift={false} className="mt-4 bg-black/25">
      <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1.8fr] lg:items-center">
        <div className="flex flex-col gap-2">
          <span className="text-purple-light/75 text-[10px] font-black tracking-widest uppercase">
            Favorites
          </span>
          <h3 className="text-xl font-black sm:text-2xl">좋아하는 것들</h3>
          <p className="text-sm break-keep text-white/50">
            커피, 농구, 힙합을 좋아합니다.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {interests.map((interest) => (
            <InterestObject
              key={interest.label}
              interest={interest}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
