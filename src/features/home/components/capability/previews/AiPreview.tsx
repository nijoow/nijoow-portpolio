'use client';

import type { CapabilityPreviewProps } from '@/features/home/components/capability/types';
import { COLOR_TOKENS, withAlpha } from '@/lib/designTokens';
import { cn } from '@/lib/utils';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';

const PROMPT = 'Enter a prompt...';
const TYPE_INTERVAL = 50;
const NODE_DELAYS = [150, 400, 650] as const;
const SUCCESS_DELAY = 900;

const NODES = [
  {
    label: 'ANALYZE',
    activeColor: COLOR_TOKENS.brand.violet,
    idleBackground: withAlpha(COLOR_TOKENS.brand.violet, 0.2),
    idleBorder: withAlpha(COLOR_TOKENS.brand.violet, 0.35),
    idleShadow: `0 0 4px ${withAlpha(COLOR_TOKENS.brand.violet, 0.15)}`,
  },
  {
    label: 'OPTIMIZE',
    activeColor: COLOR_TOKENS.accent.base,
    idleBackground: withAlpha(COLOR_TOKENS.accent.base, 0.2),
    idleBorder: withAlpha(COLOR_TOKENS.accent.base, 0.35),
    idleShadow: `0 0 4px ${withAlpha(COLOR_TOKENS.accent.base, 0.15)}`,
  },
  {
    label: 'VERIFY',
    activeColor: COLOR_TOKENS.status.success,
    idleBackground: withAlpha(COLOR_TOKENS.status.success, 0.2),
    idleBorder: withAlpha(COLOR_TOKENS.status.success, 0.35),
    idleShadow: `0 0 4px ${withAlpha(COLOR_TOKENS.status.success, 0.15)}`,
  },
] as const;

export function AiPreview({
  isActive,
  shouldReduceMotion,
}: CapabilityPreviewProps) {
  const [typedPrompt, setTypedPrompt] = useState('');
  const [activeNode, setActiveNode] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const displayedPrompt = shouldReduceMotion ? PROMPT : typedPrompt;
  const displayedNode = shouldReduceMotion ? NODES.length : activeNode;
  const showSuccess = shouldReduceMotion || isSuccess;

  useEffect(() => {
    if (!isActive || shouldReduceMotion) return;

    const timers: number[] = [];

    for (let index = 1; index <= PROMPT.length; index += 1) {
      timers.push(
        window.setTimeout(
          () => setTypedPrompt(PROMPT.slice(0, index)),
          index * TYPE_INTERVAL,
        ),
      );
    }

    const typingDuration = PROMPT.length * TYPE_INTERVAL;
    NODE_DELAYS.forEach((delay, index) => {
      timers.push(
        window.setTimeout(
          () => setActiveNode(index + 1),
          typingDuration + delay,
        ),
      );
    });
    timers.push(
      window.setTimeout(
        () => setIsSuccess(true),
        typingDuration + SUCCESS_DELAY,
      ),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [isActive, shouldReduceMotion]);

  return (
    <div className="relative h-full w-full p-2.5">
      <div className="flex h-full flex-col justify-between">
        <div className="bg-surface-panel/65 text-brand-cool relative flex min-h-4.5 items-center rounded border border-white/5 px-2 py-1 font-mono text-[7px]">
          <div className="flex w-full items-center gap-1.5">
            <span className="text-zinc-600">&gt;</span>
            <span className="flex min-h-2.5 flex-1 items-center text-[7.5px] font-bold text-white">
              {displayedPrompt}
              {isActive && !shouldReduceMotion && (
                <span className="bg-brand-lavender/80 ml-0.5 inline-block h-2.5 w-1 animate-pulse" />
              )}
            </span>
          </div>
        </div>

        <div className="relative my-1 flex items-center justify-between px-4">
          <div className="absolute top-1/2 right-6 left-6 z-0 h-px -translate-y-1/2 bg-white/10" />

          {NODES.map((node, index) => {
            const isNodeActive = displayedNode >= index + 1;

            return (
              <div
                key={node.label}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                <m.div
                  animate={
                    isNodeActive
                      ? {
                          scale: [1, 1.25, 1],
                          backgroundColor: node.activeColor,
                          borderColor: node.activeColor,
                          boxShadow: `0 0 12px ${node.activeColor}`,
                        }
                      : {
                          scale: 1,
                          backgroundColor: node.idleBackground,
                          borderColor: node.idleBorder,
                          boxShadow: node.idleShadow,
                        }
                  }
                  className="size-3 rounded-full border border-white/10"
                />
                <span
                  className={cn(
                    'text-[5.5px] font-bold transition-colors duration-300',
                    isActive || shouldReduceMotion
                      ? 'text-zinc-400'
                      : 'text-zinc-600',
                  )}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex h-3.5 items-end overflow-hidden">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <m.div
                key="success-output"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-status-success flex items-center gap-1 font-mono text-[7px] font-bold"
              >
                <span>✔</span>
                <span>prompt execution successful</span>
              </m.div>
            ) : (
              <div
                key="idle-output"
                className="flex items-center gap-1 font-mono text-[7px] font-medium text-zinc-600 opacity-50"
              >
                <span>◌</span>
                <span>awaiting optimizer agent run</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
