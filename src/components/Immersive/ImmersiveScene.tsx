'use client';

import { works } from '@/app/works/_container/worksData';
import { prefix } from '@/config/config';
import {
  Edges,
  Float,
  Image,
  RoundedBox,
  Sparkles,
  useGLTF,
} from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const Z_STEP = 3;
const FIRST_WORK_Z = -9;
const LAST_WORK_Z = FIRST_WORK_Z - (countPanels() - 1) * Z_STEP;
const CAMERA_START_Z = 5.5;
const CAMERA_END_Z = LAST_WORK_Z - 8;

function countPanels() {
  return works.filter((w) => w.imgSrc).length;
}

const PANELS = works
  .filter((work) => work.imgSrc)
  .map((work, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    return {
      page: work.pageName,
      name: work.name,
      url: `${prefix}/images/works/${work.imgSrc}`,
      position: [
        side * (2.3 + (i % 3) * 0.3),
        ((i % 3) - 1) * 0.95,
        FIRST_WORK_Z - i * Z_STEP,
      ] as [number, number, number],
      rotation: [0, -side * 0.45, 0] as [number, number, number],
    };
  });

interface NijoowGLTF {
  nodes: { Curve003: THREE.Mesh };
}

function SignatureModel() {
  const { nodes } = useGLTF('/3D/nijoowPurple.glb') as unknown as NijoowGLTF;
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh
          geometry={nodes.Curve003.geometry}
          rotation={[Math.PI / 2, 0, 0]}
          scale={26}
        >
          <meshPhysicalMaterial
            color="#8458b3"
            roughness={0.15}
            metalness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.2}
            emissive="#3a2b70"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

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
    const target = hovered ? 1.1 : 1;
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
      <RoundedBox args={[2.9, 1.95, 0.06]} radius={0.09} smoothness={4}>
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
        url={url}
        scale={[2.55, 1.6]}
        position={[0, 0, 0.045]}
        transparent
      />
    </group>
  );
}

interface ImmersiveSceneProps {
  scroll: MotionValue<number>;
  onSelect: (page: string) => void;
  onHover: (name: string | null) => void;
}

export function ImmersiveScene({
  scroll,
  onSelect,
  onHover,
}: ImmersiveSceneProps) {
  useFrame((state) => {
    const p = scroll.get();
    const z = CAMERA_START_Z + p * (CAMERA_END_Z - CAMERA_START_Z);
    state.camera.position.z = z;
    state.camera.position.x = Math.sin(p * Math.PI * 3) * 0.6;
    state.camera.position.y = Math.sin(p * Math.PI * 2) * 0.3;
    state.camera.lookAt(0, 0, z - 6);
  });

  return (
    <>
      <color attach="background" args={['#09060f']} />
      <fog attach="fog" args={['#140d24', 6, 28]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 6]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-6, -2, 2]} intensity={50} color="#8458b3" />
      <pointLight position={[6, 3, -2]} intensity={35} color="#c0a8eb" />

      <SignatureModel />

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
        count={140}
        scale={[18, 10, Math.abs(CAMERA_END_Z) + 10]}
        size={2.2}
        speed={0.25}
        color="#c0a8eb"
        opacity={0.5}
        position={[0, 0, CAMERA_END_Z / 2]}
      />
    </>
  );
}

useGLTF.preload('/3D/nijoowPurple.glb');

export const PANEL_COUNT = PANELS.length;
