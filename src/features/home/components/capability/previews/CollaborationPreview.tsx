import type { CapabilityPreviewProps } from '@/features/home/components/capability/types';
import { cn } from '@/lib/utils';
import { m } from 'framer-motion';

const CURSORS = [
  {
    label: 'Designer',
    active: { x: 84, y: 34 },
    idle: { x: 34, y: 18 },
    color: 'bg-purple-500',
    fill: '#a855f7',
    idleOffset: 4,
    idleDuration: 2.5,
  },
  {
    label: 'Developer',
    active: { x: 224, y: 64 },
    idle: { x: 272, y: 92 },
    color: 'bg-pink-500',
    fill: '#ec4899',
    idleOffset: -4,
    idleDuration: 3,
  },
] as const;

export function CollaborationPreview({
  isActive,
  isInView,
  shouldReduceMotion,
}: CapabilityPreviewProps) {
  const showResult = isActive || shouldReduceMotion;
  const animateIdleCursors = isInView && !showResult && !shouldReduceMotion;

  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            'absolute top-1/2 right-0 left-0 h-px border-t border-dashed border-purple-400/10 transition-opacity duration-300',
            showResult ? 'opacity-40' : 'opacity-10',
          )}
        />
        <div
          className={cn(
            'absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-purple-400/10 transition-opacity duration-300',
            showResult ? 'opacity-40' : 'opacity-10',
          )}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <m.div
          animate={{
            scale: showResult ? 1.08 : 1,
            borderColor: showResult
              ? 'rgba(168, 85, 247, 0.4)'
              : 'rgba(255, 255, 255, 0.1)',
            backgroundColor: showResult
              ? 'rgba(168, 85, 247, 0.16)'
              : 'rgba(255, 255, 255, 0.07)',
            boxShadow: showResult
              ? '0 8px 32px rgba(168, 85, 247, 0.25)'
              : '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative flex h-14 w-35 items-center justify-between rounded-lg border px-3 transition-colors duration-300"
        >
          <m.div
            animate={{ opacity: showResult ? 0 : 0.6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-between px-3"
          >
            <div className="flex items-center gap-2">
              <div className="size-5 rounded border border-dashed border-white/20" />
              <div className="h-2 w-12 rounded bg-white/20" />
            </div>
            <div className="h-4 w-10 rounded bg-white/10" />
          </m.div>

          <m.div
            animate={{ opacity: showResult ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-between px-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded border border-purple-500/40 bg-purple-500/20">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 1L9 5L5 9L1 5L5 1Z"
                    stroke="#c084fc"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[9px] leading-none font-extrabold text-white">
                Button
              </span>
            </div>
            <div className="flex h-5 items-center justify-center rounded-md bg-linear-to-r from-purple-500 to-indigo-500 px-2 text-[7px] font-extrabold text-white shadow-lg shadow-purple-500/30">
              Deploy
            </div>
          </m.div>

          {showResult && !shouldReduceMotion && (
            <m.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-lg border border-purple-400"
            />
          )}
        </m.div>
      </div>

      {CURSORS.map((cursor) => {
        const position = showResult ? cursor.active : cursor.idle;

        return (
          <m.div
            key={cursor.label}
            animate={{
              ...position,
              opacity: showResult ? 1 : 0.6,
              scale: showResult ? 1 : 0.95,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className="pointer-events-none absolute top-0 left-0"
          >
            <m.div
              animate={
                animateIdleCursors ? { y: [0, cursor.idleOffset, 0] } : { y: 0 }
              }
              transition={
                animateIdleCursors
                  ? {
                      repeat: Infinity,
                      duration: cursor.idleDuration,
                      ease: 'easeInOut',
                    }
                  : { duration: 0.2 }
              }
              className="flex items-center gap-1"
            >
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                <path
                  d="M1 1L4 11L6 6L11 4L1 1Z"
                  fill={cursor.fill}
                  stroke="white"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={`${cursor.color} rounded px-1 text-[7px] font-bold text-white shadow-md`}
              >
                {cursor.label}
              </span>
            </m.div>
          </m.div>
        );
      })}
    </div>
  );
}
