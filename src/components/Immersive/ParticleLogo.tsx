'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const COUNT = 9000;
const ENTRANCE_SEC = 3; // 입장 응집 길이
const BURST_SEC = 1.6; // 클릭 버스트 감쇠 길이

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
  uniform vec3 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vRand;

  void main() {
    vRand = aRandom;
    float p = smoothstep(0.0, 1.0, clamp((uProgress - aRandom * 0.35) / 0.65, 0.0, 1.0));

    // 분해 시 스월(소용돌이)
    vec3 base = position + aScatter * p;
    float ang = p * 3.0;
    float ca = cos(ang);
    float sa = sin(ang);
    base.xz = mat2(ca, -sa, sa, ca) * base.xz;

    // 시간 기반 미세 난류(분해될수록 강해짐)
    float t = uTime * 0.6 + aRandom * 6.2831;
    base += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * (0.06 + 0.12 * p);

    // 월드 공간 마우스 리펄전(실시간 인터랙션)
    vec4 world = modelMatrix * vec4(base, 1.0);
    vec3 toM = world.xyz - uMouse;
    float dd = length(toM);
    float force = smoothstep(uRadius, 0.0, dd) * uStrength;
    world.xyz += normalize(toM + 0.0001) * force;

    vec4 mv = viewMatrix * world;
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

export function ParticleLogo({
  interactive = true,
}: {
  interactive?: boolean;
}) {
  const { nodes } = useGLTF('/3D/nijoowPurple.glb') as unknown as NijoowGLTF;
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const burstRef = useRef(-Infinity);
  const timeRef = useRef(0);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

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
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uRadius: { value: 1.3 },
      uStrength: { value: 0.9 },
      uColorA: { value: new THREE.Color('#d8c7ff').multiplyScalar(1.5) },
      uColorB: { value: new THREE.Color('#8458b3').multiplyScalar(1.4) },
    }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    timeRef.current = t;

    // 입장: ENTRANCE_SEC 동안 흩어진 상태(1) → 응집(0), 큐빅 이즈로 천천히 안착.
    const entrance = 1 - THREE.MathUtils.clamp(t / ENTRANCE_SEC, 0, 1);
    const eased = entrance * entrance * entrance;
    // 아이들 호흡 + 주기적 펄스(가만히 둬도 이따금 부풀며 반짝).
    const idle = (Math.sin(t * 0.5) * 0.5 + 0.5) * 0.06;
    const pulse = Math.pow(Math.max(0, Math.sin(t * 0.7)), 10) * 0.4;
    // 클릭 버스트: 폭발 → 재조립.
    const since = t - burstRef.current;
    const burst = since >= 0 ? Math.max(0, 1 - since / BURST_SEC) : 0;
    const progress = Math.max(eased, idle, pulse, burst * burst * 0.9);

    const mat = matRef.current;
    if (mat) {
      const uProgress = mat.uniforms.uProgress;
      const uTime = mat.uniforms.uTime;
      if (uProgress) uProgress.value = progress;
      if (uTime) uTime.value = t;

      if (interactive) {
        // 마우스를 z=0 평면에 투영해 월드 좌표 산출(리펄전용).
        const cam = state.camera;
        mouseWorld.set(state.pointer.x, state.pointer.y, 0.5).unproject(cam);
        mouseWorld.sub(cam.position);
        const planeT = -cam.position.z / (mouseWorld.z || -1);
        mouseWorld.multiplyScalar(planeT).add(cam.position);
        const uMouse = mat.uniforms.uMouse;
        if (uMouse) uMouse.value.copy(mouseWorld);
      }
    }

    if (group.current) {
      group.current.rotation.y =
        t * 0.12 + (interactive ? state.pointer.x * 0.3 : 0);
      group.current.rotation.x = interactive ? -state.pointer.y * 0.2 : 0;
    }
  });

  return (
    <>
      <group ref={group}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-aScatter"
              args={[scatters, 3]}
            />
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

      {/* 클릭 캡처용 투명 평면(회전 비적용) → 어디를 클릭해도 버스트 */}
      {interactive && (
        <mesh
          position={[0, 0, -1]}
          onPointerDown={() => {
            burstRef.current = timeRef.current;
          }}
        >
          <planeGeometry args={[60, 40]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
    </>
  );
}

useGLTF.preload('/3D/nijoowPurple.glb');
