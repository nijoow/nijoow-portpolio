'use client';

import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import * as THREE from 'three';

interface SignatureSceneProps {
  scroll: MotionValue<number>;
}

// 스크롤(0~1)에 따라 시그니처 오브제가 회전·축소되고, 파편이 퍼지며
// 카메라가 전진하는 컨셉 A의 3D 씬.
export function SignatureScene({ scroll }: SignatureSceneProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = scroll.get();

    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x = p * Math.PI * 0.4;
      const scale = Math.max(0.45, 1.5 - p * 0.9);
      mesh.current.scale.setScalar(scale);
    }

    if (shards.current) {
      // 스크롤할수록 파편이 바깥으로 퍼진다 (분해 → 작업물로 흩어지는 연출).
      const spread = 1 + p * 4;
      shards.current.scale.setScalar(spread);
      shards.current.rotation.y -= delta * 0.15;
      shards.current.children.forEach((child) => {
        child.visible = p > 0.08;
      });
    }

    state.camera.position.z = 5 - p * 1.6;
    state.camera.position.y = p * 0.6;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={40} color="#8458b3" />
      <pointLight position={[4, 3, -2]} intensity={28} color="#c0a8eb" />

      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.3, 8]} />
          <MeshDistortMaterial
            color="#7c54c2"
            roughness={0.12}
            metalness={0.25}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
      </Float>

      <group ref={shards}>
        {SHARDS.map((s, i) => (
          <mesh key={i} position={s.position} rotation={s.rotation}>
            <tetrahedronGeometry args={[s.size]} />
            <meshStandardMaterial
              color="#c0a8eb"
              roughness={0.3}
              metalness={0.2}
              emissive="#5b3f9c"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>

      <Sparkles
        count={70}
        scale={9}
        size={2.4}
        speed={0.3}
        color="#c0a8eb"
        opacity={0.5}
      />
    </>
  );
}

const SHARDS: {
  position: [number, number, number];
  rotation: [number, number, number];
  size: number;
}[] = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const radius = 1.6 + (i % 3) * 0.5;
  return {
    position: [
      Math.cos(angle) * radius,
      Math.sin(angle * 1.3) * 1.2,
      Math.sin(angle) * radius,
    ],
    rotation: [angle, angle * 0.5, angle * 0.3],
    size: 0.16 + (i % 4) * 0.05,
  };
});
