'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { GlassPopover } from '@/components/ui/GlassPopover';
import { cn } from '@/lib/utils';
import { m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { type PointerEvent, useState } from 'react';

type InterestMotion = 'float' | 'bounce' | 'pulse';

interface Interest {
  label: string;
  englishLabel: string;
  detail: string;
  icon: string;
  motion: InterestMotion;
  notes: readonly string[];
}

const interests: readonly Interest[] = [
  {
    label: '커피',
    englishLabel: 'Coffee',
    detail:
      '커피는 취미를 넘어 일상의 일부가 되었습니다. 바리스타를 배우고 직접 일했던 경험을 계기로 커피를 더 깊이 즐기게 되었습니다. 새로운 원두를 경험하고, 추출 방식에 따라 달라지는 맛을 찾아가는 과정이 재미있습니다. 핸드드립으로 커피 한 잔을 내리는 시간은 저에게 가장 편안한 휴식이자 일상의 작은 즐거움입니다.',
    icon: '/images/icons/coffee.svg',
    motion: 'float',
    notes: ['#바리스타', '#핸드드립', '#스페셜티커피', '#홈카페'],
  },
  {
    label: '농구',
    englishLabel: 'Basketball',
    detail:
      '농구는 오랫동안 즐겨온 취미이자 가장 좋아하는 스포츠입니다. 가끔 길거리 농구를 하며 스트레스를 풀고, 시간이 맞으면 경기장을 찾아 직접 관람하기도 합니다. <슬램덩크>는 가장 좋아하는 만화이며, 포기를 모르는 남자 정대만을 제일 좋아합니다.',
    icon: '/images/icons/basketball.svg',
    motion: 'bounce',
    notes: ['길거리 농구', 'KBL', '슬램덩크', '정대만'],
  },
  {
    label: '음악',
    englishLabel: 'Music',
    detail:
      '음악은 일상에 자연스럽게 녹아 있는, 빠질 수 없는 존재입니다. 힙합과 발라드를 가장 좋아하고, 집중이 필요한 시간에는 재즈나 로파이 음악을 자주 틀어둡니다. K-pop과 J-pop까지 장르를 가리지 않고 다양하게 즐겨 들으며, 이동할 때나 작업할 때도 음악은 항상 함께합니다.',
    icon: '/images/icons/hiphop.svg',
    motion: 'pulse',
    notes: ['#힙합', '#발라드', '#LoFi', '#Jazz', '#플레이리스트'],
  },
];

function InterestDetails({ interest }: { interest: Interest }) {
  return (
    <div className="relative">
      <span className="text-purple-light/70 text-[10px] font-black tracking-widest uppercase">
        {interest.englishLabel}
      </span>
      <h4 className="mt-1 text-base font-bold text-white">{interest.label}</h4>
      <p className="mt-2 text-xs leading-relaxed break-keep text-white/65">
        {interest.detail}
      </p>
      <ul
        className="mt-3 flex flex-wrap gap-1.5"
        aria-label={`${interest.label} 관련 키워드`}
      >
        {interest.notes.map((note) => (
          <li
            key={note}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-white/60"
          >
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoffeeIcon({ isActive }: { isActive: boolean }) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const shouldAnimate = isActive && !shouldReduceMotion;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-11"
      aria-hidden="true"
    >
      <m.path
        d="M9.8 3.4c-.7.7-.7 1.5 0 2.2s.7 1.5 0 2.2"
        style={{ x: -1.2 }}
        stroke="#b9a3d6"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={
          shouldAnimate
            ? {
                y: [0, -2, 0],
                opacity: [0.4, 0.9, 0.4],
              }
            : { y: 0, opacity: 0.4 }
        }
        transition={
          shouldAnimate
            ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      />
      <m.path
        d="M13.3 3.4c-.7.7-.7 1.5 0 2.2s.7 1.5 0 2.2"
        style={{ x: -1.2 }}
        stroke="#b9a3d6"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={
          shouldAnimate
            ? {
                y: [-0.5, -2.5, -0.5],
                opacity: [0.3, 0.8, 0.3],
              }
            : { y: 0, opacity: 0.3 }
        }
        transition={
          shouldAnimate
            ? {
                repeat: Infinity,
                duration: 2.2,
                ease: 'easeInOut',
                delay: 0.2,
              }
            : { duration: 0.2 }
        }
      />
      <rect
        x="4.6"
        y="9"
        width="11.2"
        height="10"
        rx="3.2"
        fill="#c79064"
        stroke="#6f4a2c"
        strokeWidth="1.6"
      />
      <path
        d="M15.8 11.4h1.7a2.7 2.7 0 0 1 0 5.4h-1.7"
        stroke="#6f4a2c"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="10.2" cy="10.3" rx="4.4" ry="1.1" fill="#43291a" />
    </svg>
  );
}

function InterestObject({ interest }: { interest: Interest }) {
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isActive = isPointerActive || isPopoverOpen;

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(true);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(false);
  };

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="w-full"
    >
      <GlassPopover
        ariaLabel={`${interest.label} 취향 자세히 보기`}
        content={<InterestDetails interest={interest} />}
        onOpenChange={setIsPopoverOpen}
        className="group/interest focus-visible:ring-purple-light hover:border-purple-light/30 hover:bg-purple-medium/10 relative flex min-h-32 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-black/20 px-3 py-5 transition-[border-color,background-color,transform] hover:-translate-y-1 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <span
          aria-hidden="true"
          className="bg-purple-medium/20 absolute size-20 rounded-full blur-2xl transition-transform duration-500 group-hover/interest:scale-125 group-focus-visible/interest:scale-125"
        />
        <span
          className={cn(
            'interest-object relative flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-xl backdrop-blur-sm',
            `interest-object-${interest.motion}`,
          )}
        >
          {interest.label === '커피' ? (
            <CoffeeIcon isActive={isActive} />
          ) : (
            <Image
              src={interest.icon}
              alt=""
              width={42}
              height={42}
              className="size-11"
            />
          )}
        </span>
        <span className="relative text-center">
          <span className="block text-sm font-extrabold">{interest.label}</span>
          <span className="mt-0.5 block text-[10px] font-bold tracking-widest text-white/55 uppercase">
            {interest.englishLabel}
          </span>
        </span>
      </GlassPopover>
    </div>
  );
}

export function PersonalInterests() {
  return (
    <GlassCard lift={false} className="mt-4 bg-black/25">
      <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_1.8fr] lg:items-center">
        <div className="flex flex-col gap-2">
          <span className="text-purple-light/75 text-[10px] font-black tracking-widest uppercase">
            Favorites
          </span>
          <h3 className="text-xl font-black sm:text-2xl">좋아하는 것들</h3>
          <p className="text-sm leading-relaxed break-keep text-white/50">
            개인적이고 소소한 취미들입니다.
          </p>
          <span className="mt-1 text-[10px] font-bold tracking-wide text-white/55">
            오브젝트에 마우스를 올려 자세히 보기
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {interests.map((interest) => (
            <InterestObject key={interest.label} interest={interest} />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
