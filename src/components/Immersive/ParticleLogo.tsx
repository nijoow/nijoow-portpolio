'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const ENTRANCE_SEC = 3; // 입장 응집 길이
const BURST_SEC = 2.4; // 버스트 1회 길이(모임→흩어짐→다시 모임)
const BURST_PEAK = 0.95; // 버스트 최대 흩어짐 정도
const AUTO_BURST_SEC = 10; // clickBurst일 때 자동 버스트 주기(초)

interface NijoowGLTF {
  nodes: { Curve003: THREE.Mesh };
}

interface ParticleLogoProps {
  /** 마우스 리펄전·포인터 패럴랙스·클릭 버스트 사용 여부 */
  interactive?: boolean;
  /** 파티클 수(많을수록 글자가 또렷) */
  count?: number;
  /** 포인트 크기 배율 */
  sizeScale?: number;
  /** additive=네온 글로우(겹치면 흰색), false=노멀 블렌딩(글자 구조 또렷) */
  additive?: boolean;
  /** 상시 난류 강도(0에 가까울수록 얇은 획이 또렷) */
  jitter?: number;
  /** 비인터랙티브일 때 좌우 스윙 회전 여부(false=완전 정지) */
  rotate?: boolean;
  /** 비인터랙티브여도 클릭하면 흩어졌다 다시 모이는 동작(홈 박스용) */
  clickBurst?: boolean;
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
  uniform float uSizeScale;
  uniform float uJitterBase;
  uniform float uMaxSize;
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
    base += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * (uJitterBase + 0.12 * p);

    // 월드 공간 마우스 리펄전(실시간 인터랙션)
    vec4 world = modelMatrix * vec4(base, 1.0);
    vec3 toM = world.xyz - uMouse;
    float dd = length(toM);
    float force = smoothstep(uRadius, 0.0, dd) * uStrength;
    world.xyz += normalize(toM + 0.0001) * force;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    float size = mix(6.0, 13.0, aRandom);
    // 카메라가 가까워져도 포인트가 거대한 원반으로 번지지 않도록 상한을 둔다.
    gl_PointSize = min(size * uSizeScale * (8.0 / -mv.z), uMaxSize);
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
    // 가운데는 또렷, 가장자리는 더 부드럽게 — 거친 원반 느낌 완화.
    float alpha = pow(smoothstep(0.5, 0.0, d), 1.5);
    vec3 col = mix(uColorA, uColorB, vRand);
    gl_FragColor = vec4(col, alpha);
  }
`;

export function ParticleLogo({
  interactive = true,
  count = 40000,
  sizeScale = 0.07,
  additive = true,
  jitter = 0.003,
  rotate = true,
  clickBurst = false,
}: ParticleLogoProps) {
  // 작고 또렷한 서명 스타일 — 포인트 최대 크기 상한(가까이서 원반화 방지).
  const finalMaxSize = 15;

  const { nodes } = useGLTF('/3D/nijoowPurple.glb') as unknown as NijoowGLTF;
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const burstRef = useRef(-Infinity);
  const autoRef = useRef(0);
  const timeRef = useRef(0);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

  const { positions, scatters, randoms } = useMemo(() => {
    const rand = mulberry32(0x9e3779b9);
    const mesh = new THREE.Mesh(nodes.Curve003.geometry);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const transform = new THREE.Matrix4()
      .makeRotationX(Math.PI / 2)
      .multiply(new THREE.Matrix4().makeScale(26, 26, 26));

    const positions = new Float32Array(count * 3);
    const scatters = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const temp = new THREE.Vector3();
    const centroid = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(temp);
      temp.applyMatrix4(transform);
      positions[i * 3] = temp.x;
      positions[i * 3 + 1] = temp.y;
      positions[i * 3 + 2] = temp.z;
      centroid.add(temp);
      randoms[i] = rand();
    }
    centroid.multiplyScalar(1 / count);

    let maxR = 0.001;
    for (let i = 0; i < count; i++) {
      const x = (positions[i * 3] ?? 0) - centroid.x;
      const y = (positions[i * 3 + 1] ?? 0) - centroid.y;
      const z = (positions[i * 3 + 2] ?? 0) - centroid.z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      maxR = Math.max(maxR, Math.sqrt(x * x + y * y + z * z));
    }

    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1;
      const theta = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const dist = maxR * (0.6 + rand() * 2.4);
      scatters[i * 3] = Math.cos(theta) * r * dist;
      scatters[i * 3 + 1] = Math.sin(theta) * r * dist;
      scatters[i * 3 + 2] = u * dist;
    }

    return { positions, scatters, randoms };
  }, [nodes, count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 1 },
      uTime: { value: 0 },
      uSizeScale: { value: sizeScale },
      uJitterBase: { value: jitter },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uRadius: { value: 1.3 },
      uStrength: { value: 0.9 },
      uMaxSize: { value: finalMaxSize },
      uColorA: { value: new THREE.Color('#d8c7ff').multiplyScalar(1.5) },
      uColorB: { value: new THREE.Color('#8458b3').multiplyScalar(1.4) },
    }),
    [sizeScale, jitter, finalMaxSize],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    timeRef.current = t;

    // 입장: ENTRANCE_SEC 동안 흩어진 상태(1) → 응집(0), 큐빅 이즈로 천천히 안착.
    const entrance = 1 - THREE.MathUtils.clamp(t / ENTRANCE_SEC, 0, 1);
    const eased = entrance * entrance * entrance;
    // 비인터랙티브(홈 로고/인트로)는 정지 시 글자가 또렷 — 상시 스캐터 없음.
    const idle = interactive ? (Math.sin(t * 0.5) * 0.5 + 0.5) * 0.06 : 0;
    const pulse = interactive
      ? Math.pow(Math.max(0, Math.sin(t * 0.7)), 10) * 0.4
      : 0;
    // 자동 버스트(clickBurst 전용): 마지막 버스트로부터 AUTO_BURST_SEC마다 1회.
    if (clickBurst && t - autoRef.current >= AUTO_BURST_SEC) {
      autoRef.current = t;
      burstRef.current = t;
    }
    // 버스트 곡선: 모인 글자(0)에서 시작해 흩어졌다(피크) 다시 모인다(0).
    const since = t - burstRef.current;
    const bp = since >= 0 ? since / BURST_SEC : Infinity;
    const burst = bp <= 1 ? Math.sin(Math.PI * bp) * BURST_PEAK : 0;
    const progress = Math.max(eased, idle, pulse, burst);

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
      if (interactive) {
        // 인트로: 느린 자전 + 포인터 패럴랙스
        group.current.rotation.y = t * 0.12 + state.pointer.x * 0.3;
        group.current.rotation.x = -state.pointer.y * 0.2;
      } else {
        // 클래식 로고: 정면을 유지하는 부드러운 좌우 스윙(글자 가독성). 드래그는 OrbitControls.
        // rotate=false면 완전 정지(인트로용).
        group.current.rotation.y = rotate ? Math.sin(t * 0.3) * 0.5 : 0;
        group.current.rotation.x = 0;
      }
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
            depthWrite={!additive}
            blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
          />
        </points>
      </group>

      {/* 우클릭 캡처용 투명 평면 → 우클릭하면 흩어졌다 복귀(자동으로도 주기적 발동). */}
      {(interactive || clickBurst) && (
        <mesh
          position={[0, 0, -1]}
          onContextMenu={(e) => {
            e.nativeEvent.preventDefault();
            burstRef.current = timeRef.current;
            autoRef.current = timeRef.current;
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
