'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const COUNT = 9000;
const FOLLOW_DISTANCE = 4.2; // 카메라 앞 고정 거리

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

function ramp(x: number, a: number, b: number) {
  return THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
}

// 섹션 경계(hero→works, works→contact)에서 분해, 섹션 안에선 모인 상태.
function dissolveProgress(p: number) {
  if (p < 0.22) return ramp(p, 0.1, 0.22); // hero → works: 분해
  if (p < 0.78) return 1; // works: 분해 유지(갤러리 비춤)
  return 1 - ramp(p, 0.78, 0.9); // works → contact: 재조립
}

// 작업물 구간에선 흐려져 갤러리를 가리지 않게, 양 끝(hero/contact)에선 또렷하게.
function logoOpacity(p: number) {
  if (p < 0.25) return THREE.MathUtils.lerp(1, 0.1, ramp(p, 0.12, 0.25));
  if (p < 0.75) return 0.1;
  return THREE.MathUtils.lerp(0.1, 1, ramp(p, 0.75, 0.92));
}

const vertexShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vRand;

  void main() {
    vRand = aRandom;
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
  uniform float uOpacity;
  varying float vRand;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uColorA, uColorB, vRand);
    gl_FragColor = vec4(col, alpha * uOpacity);
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
    const transform = new THREE.Matrix4()
      .makeRotationX(Math.PI / 2)
      .multiply(new THREE.Matrix4().makeScale(26, 26, 26));

    const positions = new Float32Array(COUNT * 3);
    const scatters = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const temp = new THREE.Vector3();
    const centroid = new THREE.Vector3();

    for (let i = 0; i < COUNT; i++) {
      sampler.sample(temp);
      temp.applyMatrix4(transform);
      positions[i * 3] = temp.x;
      positions[i * 3 + 1] = temp.y;
      positions[i * 3 + 2] = temp.z;
      centroid.add(temp);
      randoms[i] = rand();
    }
    centroid.multiplyScalar(1 / COUNT);

    // 로고를 그룹 원점에 정렬(카메라 추종 시 중앙에 오도록) + 분산 반경 산출.
    let maxR = 0.001;
    for (let i = 0; i < COUNT; i++) {
      const x = (positions[i * 3] ?? 0) - centroid.x;
      const y = (positions[i * 3 + 1] ?? 0) - centroid.y;
      const z = (positions[i * 3 + 2] ?? 0) - centroid.z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      maxR = Math.max(maxR, Math.sqrt(x * x + y * y + z * z));
    }

    for (let i = 0; i < COUNT; i++) {
      // 방사형 분산(구면 균등) — 사방으로 터지는 폭발/응집 연출.
      const u = rand() * 2 - 1;
      const theta = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const dist = maxR * (0.6 + rand() * 2.4);
      scatters[i * 3] = Math.cos(theta) * r * dist;
      scatters[i * 3 + 1] = Math.sin(theta) * r * dist;
      scatters[i * 3 + 2] = u * dist;
    }

    return { positions, scatters, randoms };
  }, [nodes]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uColorA: { value: new THREE.Color('#d8c7ff').multiplyScalar(1.5) },
      uColorB: { value: new THREE.Color('#8458b3').multiplyScalar(1.4) },
    }),
    [],
  );

  useFrame((state) => {
    const cam = state.camera;
    if (group.current) {
      // 카메라 앞 고정 거리에 위치(추종) + 부드러운 부유. 정면 facing은 유지.
      group.current.position.set(
        cam.position.x,
        cam.position.y + Math.sin(state.clock.elapsedTime * 0.6) * 0.15,
        cam.position.z - FOLLOW_DISTANCE,
      );
    }
    const p = scroll.get();
    const mat = matRef.current;
    if (mat) {
      const uProgress = mat.uniforms.uProgress;
      const uOpacity = mat.uniforms.uOpacity;
      const uTime = mat.uniforms.uTime;
      if (uProgress) uProgress.value = dissolveProgress(p);
      if (uOpacity) uOpacity.value = logoOpacity(p);
      if (uTime) uTime.value = state.clock.elapsedTime;
    }
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
