'use client';

import { prefix } from '@/config/config';
import { Edges, Image, RoundedBox } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const COLS = 3;
const COL_GAP = 3;
const ROW_GAP = 2.2;
const CAMERA_Z = 8;

export interface WorkItem {
  page: string;
  name: string;
  imgSrc: string;
}

interface PanelProps {
  item: WorkItem;
  position: [number, number, number];
  onSelect: (page: string) => void;
  onHover: (name: string | null) => void;
}

function Panel({ item, position, onSelect, onHover }: PanelProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const targetScale = hovered ? 1.07 : 1;
    const next =
      ref.current.scale.x + (targetScale - ref.current.scale.x) * 0.15;
    ref.current.scale.setScalar(next);
    const targetZ = hovered ? 0.5 : 0;
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.15;
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        onHover(item.name);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(item.page);
      }}
    >
      <RoundedBox args={[2.6, 1.62, 0.06]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color="#b9a4ea"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.25}
        />
        <Edges threshold={15} color={hovered ? '#e7dbff' : '#8a6fd6'} />
      </RoundedBox>
      {/* eslint-disable-next-line jsx-a11y/alt-text -- drei Image는 3D 평면이라 alt 미해당 */}
      <Image
        url={`${prefix}/images/works/${item.imgSrc}`}
        scale={[2.3, 1.42]}
        position={[0, 0, 0.045]}
        transparent
      />
    </group>
  );
}

interface WorksWallSceneProps {
  items: WorkItem[];
  scroll: MotionValue<number>;
  onSelect: (page: string) => void;
  onHover: (name: string | null) => void;
}

export function WorksWallScene({
  items,
  scroll,
  onSelect,
  onHover,
}: WorksWallSceneProps) {
  const rows = Math.max(1, Math.ceil(items.length / COLS));
  const totalHeight = (rows - 1) * ROW_GAP;

  useFrame((state) => {
    const camY = -scroll.get() * totalHeight;
    state.camera.position.set(0, camY, CAMERA_Z);
    state.camera.lookAt(0, camY, 0);
  });

  return (
    <>
      <color attach="background" args={['#0b0813']} />
      <fog attach="fog" args={['#160f26', 8, 24]} />
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 2, 6]} intensity={26} color="#c0a8eb" />
      <pointLight position={[-4, -2, 4]} intensity={18} color="#8458b3" />

      {items.map((item, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = (col - (COLS - 1) / 2) * COL_GAP;
        const y = -row * ROW_GAP;
        return (
          <Panel
            key={item.page}
            item={item}
            position={[x, y, 0]}
            onSelect={onSelect}
            onHover={onHover}
          />
        );
      })}
    </>
  );
}
