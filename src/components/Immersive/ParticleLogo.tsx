'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const COUNT = 9000;

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

// 인트로 전용 — 입장 시 흩어진 파티클이 로고로 응집하고, 이후 은은히 호흡한다.
export function ParticleLogo() {
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
      uProgress: { value: 1 },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#d8c7ff').multiplyScalar(1.5) },
      uColorB: { value: new THREE.Color('#8458b3').multiplyScalar(1.4) },
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // 입장: 1.8초에 걸쳐 흩어진 상태(1) → 응집(0). 이후 은은한 호흡.
    const entrance = 1 - THREE.MathUtils.clamp(t / 1.8, 0, 1);
    const eased = entrance * entrance;
    const idle = (Math.sin(t * 0.5) * 0.5 + 0.5) * 0.05;
    const progress = Math.max(eased, idle);

    const mat = matRef.current;
    if (mat) {
      const uProgress = mat.uniforms.uProgress;
      const uTime = mat.uniforms.uTime;
      if (uProgress) uProgress.value = progress;
      if (uTime) uTime.value = t;
    }

    if (group.current) {
      // 느린 자전 + 포인터 패럴랙스로 "살아있는" 느낌.
      group.current.rotation.y = t * 0.12 + state.pointer.x * 0.3;
      group.current.rotation.x = -state.pointer.y * 0.2;
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
