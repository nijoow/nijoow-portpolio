'use client';

import { works } from '@/app/works/_container/worksData';
import { prefix } from '@/config/config';
import { Image, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { Suspense } from 'react';

// 작업물을 z축을 따라 배치된 떠있는 글래스 패널로 변환한다.
const PANELS = works
  .filter((work) => work.imgSrc)
  .slice(0, 8)
  .map((work, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    return {
      page: work.pageName,
      url: `${prefix}/images/works/${work.imgSrc}`,
      position: [
        side * (2.1 + (i % 3) * 0.3),
        ((i % 3) - 1) * 0.8,
        2 - i * 3,
      ] as [number, number, number],
      rotation: [0, -side * 0.4, 0] as [number, number, number],
    };
  });

const lastPanel = PANELS[PANELS.length - 1];
const END_Z = lastPanel ? lastPanel.position[2] - 6 : -24;
const START_Z = 6;

interface CinematicSceneProps {
  scroll: MotionValue<number>;
}

export function CinematicScene({ scroll }: CinematicSceneProps) {
  useFrame((state) => {
    const p = scroll.get();
    const z = START_Z + p * (END_Z - START_Z);
    state.camera.position.z = z;
    state.camera.position.x = Math.sin(p * Math.PI * 2) * 0.9;
    state.camera.position.y = Math.sin(p * Math.PI) * 0.4;
    state.camera.lookAt(state.camera.position.x * 0.4, 0, z - 6);
  });

  return (
    <>
      <color attach="background" args={['#0b0813']} />
      <fog attach="fog" args={['#160f26', 5, 24]} />
      <ambientLight intensity={1.3} />
      <pointLight position={[0, 4, 4]} intensity={32} color="#c0a8eb" />
      <pointLight position={[-4, -2, -4]} intensity={22} color="#8458b3" />

      <Suspense fallback={null}>
        {PANELS.map((panel) => (
          // eslint-disable-next-line jsx-a11y/alt-text -- drei Image는 3D 평면이라 alt 미해당
          <Image
            key={panel.page}
            url={panel.url}
            position={panel.position}
            rotation={panel.rotation}
            scale={[2.6, 1.6]}
            transparent
          />
        ))}
      </Suspense>

      <Sparkles
        count={120}
        scale={[16, 9, 34]}
        size={2.4}
        speed={0.25}
        color="#c0a8eb"
        opacity={0.5}
        position={[0, 0, -9]}
      />
    </>
  );
}
