'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { CapabilityMicroUi } from '@/features/home/components/capability/CapabilityMicroUi';
import type {
  CapabilityConfig,
  CapabilityIconType,
} from '@/features/home/components/capability/types';
import { FINE_POINTER_MEDIA_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { useInView, useReducedMotion } from 'framer-motion';
import {
  Blocks,
  Bot,
  Code2,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';
import { useRef, useState, type FocusEvent, type PointerEvent } from 'react';

const CAPABILITY_ICONS: Record<CapabilityIconType, LucideIcon> = {
  design: PanelsTopLeft,
  code: Code2,
  interaction: Blocks,
  ai: Bot,
};

export function CapabilityCard({
  title,
  description,
  icon,
  preview,
}: CapabilityConfig) {
  const articleRef = useRef<HTMLElement>(null);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const hasFinePointer = useMediaQuery(FINE_POINTER_MEDIA_QUERY);
  const isInView = useInView(articleRef, { amount: 0.55 });
  const shouldReduceMotion = Boolean(useReducedMotion());
  const Icon = CAPABILITY_ICONS[icon];
  const isActive =
    shouldReduceMotion || isPointerActive || (!hasFinePointer && isInView);

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(true);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') setIsPointerActive(false);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }
    setIsPointerActive(false);
  };

  return (
    <GlassCard className="group/capability h-full">
      <article
        ref={articleRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocusCapture={() => setIsPointerActive(true)}
        onBlurCapture={handleBlur}
        className="flex h-full flex-col gap-4 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="text-brand-violet group-hover/capability:border-brand-lavender/25 group-hover/capability:bg-brand-violet/15 group-focus-within/capability:border-brand-lavender/25 group-focus-within/capability:bg-brand-violet/15 flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors">
            <Icon size={19} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-extrabold">{title}</h3>
            <p className="text-sm leading-relaxed break-keep text-white/55">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-1">
          <CapabilityMicroUi
            type={preview}
            isActive={isActive}
            isInView={isInView}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </article>
    </GlassCard>
  );
}
