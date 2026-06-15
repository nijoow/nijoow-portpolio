'use client';

import { works } from '@/app/works/_container/worksData';
import { prefix } from '@/config/config';
import { Image, Sparkles } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const Z_STEP = 2.8;
const START_Z = 7;

const PANELS = works
  .filter((work) => work.imgSrc)
  .map((work, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    return {
      page: work.pageName,
      name: work.name,
      url: `${prefix}/images/works/${work.imgSrc}`,
      position: [
        side * (2.2 + (i % 3) * 0.3),
        ((i % 3) - 1) * 0.9,
        4 - i * Z_STEP,
      ] as [number, number, number],
      rotation: [0, -side * 0.45, 0] as [number, number, number],
    };
  });

const END_Z = 4 - (PANELS.length - 1) * Z_STEP - 6;

interface PanelProps {
  url: string;
  name: string;
  page: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onSelect: (page: string) => void;
  onHover: (name: string | null) => void;
}

function Panel({
  url,
  name,
  page,
  position,
  rotation,
  onSelect,
  onHover,
}: PanelProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered ? 1.12 : 1;
    const next = ref.current.scale.x + (target - ref.current.scale.x) * 0.12;
    ref.current.scale.setScalar(next);
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        onHover(name);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(page);
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text -- drei Image는 3D 평면이라 alt 미해당 */}
      <Image url={url} scale={[2.5, 1.55]} transparent />
    </group>
  );
}

interface WorksGallerySceneProps {
  scroll: MotionValue<number>;
  onSelect: (page: string) => void;
  onHover: (name: string | null) => void;
}

export function WorksGalleryScene({
  scroll,
  onSelect,
  onHover,
}: WorksGallerySceneProps) {
  useFrame((state) => {
    const p = scroll.get();
    const z = START_Z + p * (END_Z - START_Z);
    state.camera.position.z = z;
    state.camera.position.x = Math.sin(p * Math.PI * 3) * 0.7;
    state.camera.lookAt(0, 0, z - 6);
  });

  return (
    <>
      <color attach="background" args={['#0b0813']} />
      <fog attach="fog" args={['#160f26', 5, 22]} />
      <ambientLight intensity={1.3} />
      <pointLight position={[0, 4, 4]} intensity={32} color="#c0a8eb" />
      <pointLight position={[-4, -2, -4]} intensity={22} color="#8458b3" />

      {PANELS.map((panel) => (
        <Panel
          key={panel.page}
          url={panel.url}
          name={panel.name}
          page={panel.page}
          position={panel.position}
          rotation={panel.rotation}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      <Sparkles
        count={120}
        scale={[16, 9, 40]}
        size={2.4}
        speed={0.25}
        color="#c0a8eb"
        opacity={0.5}
        position={[0, 0, -12]}
      />
    </>
  );
}

export const PANEL_COUNT = PANELS.length;
