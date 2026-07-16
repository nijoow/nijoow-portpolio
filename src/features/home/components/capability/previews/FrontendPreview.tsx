'use client';

import type { CapabilityPreviewProps } from '@/features/home/components/capability/types';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEP_DELAYS = [200, 450, 700, 900, 1250] as const;

export function FrontendPreview({
  isActive,
  shouldReduceMotion,
}: CapabilityPreviewProps) {
  const [step, setStep] = useState(0);
  const visibleStep = shouldReduceMotion ? STEP_DELAYS.length : step;
  const showCode = isActive || shouldReduceMotion;
  const showParticle = visibleStep === 4 && !shouldReduceMotion;
  const renderUi = visibleStep >= 5;

  useEffect(() => {
    if (!isActive || shouldReduceMotion) return;

    const timers = STEP_DELAYS.map((delay, index) =>
      window.setTimeout(() => setStep(index + 1), delay),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [isActive, shouldReduceMotion]);

  return (
    <div className="relative h-full w-full p-3">
      <div className="grid h-full grid-cols-[1.2fr_20px_1fr] items-center gap-1">
        <div className="flex h-full flex-col rounded-lg border border-white/5 bg-zinc-950/70 p-2 font-mono text-[7px] text-zinc-400">
          <div className="mb-1.5 flex items-center gap-1 border-b border-white/5 pb-1">
            <span className="size-1.5 rounded-full bg-red-500/60" />
            <span className="size-1.5 rounded-full bg-yellow-500/60" />
            <span className="size-1.5 rounded-full bg-green-500/60" />
            <span className="ml-1 text-[6px] text-zinc-600">Button.tsx</span>
          </div>

          <div className="relative flex flex-1 flex-col justify-center gap-1 leading-normal">
            {!showCode && (
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-1 opacity-25 select-none">
                <span>
                  const <span className="text-blue-400">Btn</span> = () =&gt; (
                </span>
                <span className="pl-2 text-zinc-500">
                  &lt;<span className="text-pink-400">button</span>{' '}
                  <span className="text-yellow-500">glow</span> /&gt;
                </span>
                <span>);</span>
              </div>
            )}

            <div className="h-2.5 overflow-hidden">
              <AnimatePresence>
                {showCode && visibleStep >= 1 && (
                  <m.span
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-purple-400"
                  >
                    const <span className="text-blue-400">Btn</span> = () =&gt;
                    (
                  </m.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-2.5 overflow-hidden">
              <AnimatePresence>
                {showCode && visibleStep >= 2 && (
                  <m.span
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="pl-2 text-zinc-500"
                  >
                    &lt;<span className="text-pink-400">button</span>{' '}
                    <span className="text-yellow-500">glow</span> /&gt;
                  </m.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-2.5 overflow-hidden">
              <AnimatePresence>
                {showCode && visibleStep >= 3 && (
                  <m.span
                    initial={{ opacity: 0, x: -3 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-purple-400"
                  >
                    );
                  </m.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative h-full w-full">
          <AnimatePresence>
            {showParticle && (
              <m.div
                initial={{ x: -10, y: 0, scale: 0.5, opacity: 0 }}
                animate={{
                  x: [0, 12, 24],
                  y: [-12, -22, 0],
                  scale: [1, 1.2, 0.8],
                  opacity: [1, 1, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                className="absolute top-1/2 left-0 z-10 size-2 rounded-full bg-linear-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500 blur-[1px]"
              />
            )}
          </AnimatePresence>
        </div>

        <m.div
          animate={{
            borderColor: renderUi
              ? 'rgba(168, 85, 247, 0.25)'
              : 'rgba(255, 255, 255, 0.05)',
          }}
          className="relative flex h-full flex-col items-center justify-center rounded-lg border bg-zinc-900/40 p-2"
        >
          <span className="absolute top-1.5 left-2 text-[6px] font-bold tracking-wider text-zinc-600">
            PREVIEW
          </span>

          <AnimatePresence mode="wait">
            {showCode && renderUi ? (
              <m.div
                key="rendered-ui"
                initial={{ scale: 0.3, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 14 }}
                exit={{ scale: 0.7, opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="relative flex h-8 w-17 items-center justify-center rounded-md border border-purple-500/30 bg-purple-950/20 shadow-md shadow-purple-500/10">
                  <span className="text-[7px] font-extrabold text-white">
                    Click Me
                  </span>
                  <span className="absolute -top-px right-1/4 left-1/4 h-px bg-linear-to-r from-transparent via-purple-400 to-transparent" />
                </div>
                <span className="text-[6px] font-bold text-zinc-500">
                  Active
                </span>
              </m.div>
            ) : (
              <m.div
                key="empty-ui"
                className="flex flex-col items-center gap-1.5 opacity-35"
              >
                <div className="relative flex h-8 w-17 items-center justify-center rounded-md border border-white/10 bg-zinc-950/20 shadow-sm">
                  <span className="text-[7px] font-bold text-zinc-500">
                    Click Me
                  </span>
                </div>
                <span className="text-[6px] font-bold text-zinc-600">
                  Building
                </span>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </div>
  );
}
