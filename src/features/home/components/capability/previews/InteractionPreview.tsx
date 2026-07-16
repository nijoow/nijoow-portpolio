'use client';

import type { CapabilityPreviewProps } from '@/features/home/components/capability/types';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type PointerEvent, useEffect } from 'react';

const ROTATION_SPRING = { stiffness: 120, damping: 15, mass: 0.6 } as const;
const POSITION_SPRING = { stiffness: 90, damping: 16 } as const;
const LAYER_SPRING = { stiffness: 100, damping: 14 } as const;

export function InteractionPreview({
  isActive,
  isInView,
  shouldReduceMotion,
}: CapabilityPreviewProps) {
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const orbitXTarget = useMotionValue(0);
  const orbitYTarget = useMotionValue(0);
  const cardXTarget = useMotionValue(0);
  const cardYTarget = useMotionValue(0);
  const layerGapTarget = useMotionValue(0);

  const rotateX = useSpring(rotateXTarget, ROTATION_SPRING);
  const rotateY = useSpring(rotateYTarget, ROTATION_SPRING);
  const orbitX = useSpring(orbitXTarget, POSITION_SPRING);
  const orbitY = useSpring(orbitYTarget, POSITION_SPRING);
  const inverseOrbitX = useTransform(orbitX, (value) => -value * 0.8);
  const inverseOrbitY = useTransform(orbitY, (value) => -value * 0.8);
  const cardX = useSpring(cardXTarget, POSITION_SPRING);
  const cardY = useSpring(cardYTarget, POSITION_SPRING);
  const layerGap = useSpring(layerGapTarget, LAYER_SPRING);
  const bottomLayerZ = useTransform(layerGap, [0, 1], [-6, -25]);
  const middleLayerZ = useTransform(layerGap, [0, 1], [0, 0]);
  const topLayerZ = useTransform(layerGap, [0, 1], [6, 25]);

  useEffect(() => {
    layerGapTarget.set(isActive ? 1 : 0);
  }, [isActive, layerGapTarget]);

  useEffect(() => {
    if (isActive && !shouldReduceMotion) return;

    rotateXTarget.set(0);
    rotateYTarget.set(0);
    cardXTarget.set(0);
    cardYTarget.set(0);
    orbitXTarget.set(0);
    orbitYTarget.set(0);
  }, [
    cardXTarget,
    cardYTarget,
    isActive,
    orbitXTarget,
    orbitYTarget,
    rotateXTarget,
    rotateYTarget,
    shouldReduceMotion,
  ]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isActive || shouldReduceMotion || event.pointerType === 'touch')
      return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    rotateXTarget.set(-y * 24);
    rotateYTarget.set(x * 24);
    cardXTarget.set(x * 24);
    cardYTarget.set(y * 14);
    orbitXTarget.set(x * 8);
    orbitYTarget.set(y * 8);
  };

  const resetPointer = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
    cardXTarget.set(0);
    cardYTarget.set(0);
    orbitXTarget.set(0);
    orbitYTarget.set(0);
  };

  const animateAmbientMotion = isInView && !shouldReduceMotion;
  const animateIdleFloat = animateAmbientMotion && !isActive;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative h-full w-full"
    >
      <div className="absolute inset-0 flex items-center justify-center [perspective:600px]">
        <m.div
          style={{ x: orbitX, y: orbitY, rotateX: 62, rotateY: 10 }}
          animate={animateAmbientMotion ? { rotateZ: 360 } : { rotateZ: 0 }}
          transition={
            animateAmbientMotion
              ? { duration: 12, repeat: Infinity, ease: 'linear' }
              : { duration: 0.2 }
          }
          className="absolute h-36 w-40 rounded-full border border-dashed border-purple-500/20"
        />

        <m.div
          style={{
            x: inverseOrbitX,
            y: inverseOrbitY,
            rotateX: 45,
            rotateY: -35,
          }}
          animate={animateAmbientMotion ? { rotateZ: -360 } : { rotateZ: 0 }}
          transition={
            animateAmbientMotion
              ? { duration: 9, repeat: Infinity, ease: 'linear' }
              : { duration: 0.2 }
          }
          className="absolute h-32 w-36 rounded-full border border-purple-400/15"
        />

        <m.div
          animate={animateIdleFloat ? { y: [0, -3, 0] } : { y: 0 }}
          transition={
            animateIdleFloat
              ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          className="relative h-17 w-22.5"
        >
          <m.div
            style={{ rotateX, rotateY, x: cardX, y: cardY }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <m.div
              style={{ x: 9, y: 14, z: bottomLayerZ }}
              className="absolute inset-0 flex items-center justify-center rounded-lg border border-purple-500/20 bg-zinc-950/40 p-1.5 shadow-md [transform-style:preserve-3d]"
            >
              <div className="h-full w-full rounded border border-dashed border-purple-500/30 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:6px_6px] opacity-40" />
            </m.div>

            <m.div
              style={{ x: -10, y: -6, z: middleLayerZ }}
              className="absolute inset-0 flex flex-col justify-between rounded-lg border border-white/10 bg-zinc-900/60 p-2 shadow-lg backdrop-blur-[1px] [transform-style:preserve-3d]"
            >
              <div className="h-1.5 w-8 rounded bg-white/20" />
              <div className="flex gap-1">
                <div className="h-4 w-7 rounded border border-purple-500/30 bg-purple-500/10" />
                <div className="h-4 w-7 rounded border border-white/10 bg-white/5" />
              </div>
            </m.div>

            <m.div
              style={{ z: topLayerZ }}
              className="absolute inset-0 flex flex-col justify-between rounded-lg border border-purple-400/30 bg-purple-950/10 p-2 shadow-[0_0_15px_rgba(168,85,247,0.15)] backdrop-blur-[1px] [transform-style:preserve-3d]"
            >
              <div className="h-1.5 w-6 rounded bg-purple-400/40" />
              <div className="flex justify-end">
                <m.div
                  animate={
                    isActive
                      ? { scale: 1.05, filter: 'brightness(1.2)' }
                      : { scale: 1, filter: 'brightness(1)' }
                  }
                  className="flex h-4 w-10 items-center justify-center rounded bg-linear-to-r from-purple-500 to-pink-500 text-[5px] font-black text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                >
                  Glow
                </m.div>
              </div>
            </m.div>
          </m.div>
        </m.div>
      </div>

      <span className="absolute right-2 bottom-1.5 text-[6px] font-black tracking-wider text-purple-400/40">
        3D EXPLODED DECK
      </span>
    </div>
  );
}
