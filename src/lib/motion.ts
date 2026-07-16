import type { Transition } from 'framer-motion';

export const MOTION_EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const MOTION_DURATION = {
  quick: 0.18,
  standard: 0.32,
  reveal: 0.56,
} as const;

export const STANDARD_TRANSITION = {
  duration: MOTION_DURATION.standard,
  ease: MOTION_EASE_OUT,
} satisfies Transition;

export const REVEAL_TRANSITION = {
  duration: MOTION_DURATION.reveal,
  ease: MOTION_EASE_OUT,
} satisfies Transition;
