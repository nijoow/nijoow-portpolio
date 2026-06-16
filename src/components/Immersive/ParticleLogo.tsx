'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const COUNT = 9000;
// 스크롤 0~DISSOLVE_END 구간에서 로고가 완전히 분해된다(그 이상은 분해 유지).
const DISSOLVE_END = 0.32;

interface NijoowGLTF {
  nodes: { Curve003: THREE.Mesh };
}

// 결정론적 PRNG(시드 고정) — 렌더 중 Math.random 호출(순수성 위반)을 피한다.
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vRand;

  void main() {
    vRand = aRandom;
    // 파티클마다 분해 시점을 살짝 엇갈리게(staggered) 해 유기적으로 흩어진다.
    float p = smoothstep(0.0, 1.0, clamp((uProgress - aRandom * 0.35) / 0.65, 0.0, 1.0));
    vec3 pos = position + aScatter * p;
    float t = uTime * 0.6 + aRandom * 6.2831;
    pos += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * 0.12 * p;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = mix(6.0, 13.0, aRandom);
    gl_PointSize = size * (8.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vRand;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, vRand);
    gl_FragColor = vec4(col, alpha);
  }
`;

export function ParticleLogo({ scroll }: { scroll: MotionValue<number> }) {
  const { nodes } = useGLTF('/3D/nijoowPurple.glb') as unknown as NijoowGLTF;
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, scatters, randoms } = useMemo(() => {
    const rand = mulberry32(0x9e3779b9);
    const mesh = new THREE.Mesh(nodes.Curve003.geometry);
    const sampler = new MeshSurfaceSampler(mesh).build();
    // 디스플레이와 동일한 변환(회전 X 90°, scale 26)을 점에 직접 굽는다.
    const transform = new THREE.Matrix4()
      .makeRotationX(Math.PI / 2)
      .multiply(new THREE.Matrix4().makeScale(26, 26, 26));

    const positions = new Float32Array(COUNT * 3);
    const scatters = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const temp = new THREE.Vector3();
    let maxR = 0.001;

    for (let i = 0; i < COUNT; i++) {
      sampler.sample(temp);
      temp.applyMatrix4(transform);
      positions[i * 3] = temp.x;
      positions[i * 3 + 1] = temp.y;
      positions[i * 3 + 2] = temp.z;
      maxR = Math.max(maxR, temp.length());
      randoms[i] = rand();
    }

    for (let i = 0; i < COUNT; i++) {
      // 분해 방향은 무작위이되 -z(작업물 쪽 깊이)로 살짝 편향 → 갤러리로 안내.
      const dir = new THREE.Vector3(
        rand() - 0.5,
        rand() - 0.5,
        -(rand() * 0.6 + 0.2),
      ).normalize();
      const dist = maxR * (0.6 + rand() * 2.4);
      scatters[i * 3] = dir.x * dist;
      scatters[i * 3 + 1] = dir.y * dist;
      scatters[i * 3 + 2] = dir.z * dist;
    }

    return { positions, scatters, randoms };
  }, [nodes]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#d8c7ff').multiplyScalar(1.5) },
      uColorB: { value: new THREE.Color('#8458b3').multiplyScalar(1.4) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const mat = matRef.current;
    if (mat) {
      const uProgress = mat.uniforms.uProgress;
      const uTime = mat.uniforms.uTime;
      if (uProgress)
        uProgress.value = THREE.MathUtils.clamp(
          scroll.get() / DISSOLVE_END,
          0,
          1,
        );
      if (uTime) uTime.value = state.clock.elapsedTime;
    }
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[scatters, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

useGLTF.preload('/3D/nijoowPurple.glb');
