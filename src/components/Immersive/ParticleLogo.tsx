'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const ENTRANCE_SEC = 3; // 입장 응집 길이
const BURST_SEC = 2.4; // 버스트 1회 길이(모임→흩어짐→다시 모임)
const BURST_PEAK = 0.95; // 버스트 최대 흩어짐 정도
const AUTO_BURST_SEC = 10; // clickBurst일 때 자동 버스트 주기(초)

interface ParticleLogoProps {
  /** 마우스 리펄전·포인터 패럴랙스·클릭 버스트 사용 여부 */
  interactive?: boolean;
  /** 파티클 수(많을수록 글자가 또렷) */
  count?: number;
  /** 포인트 크기 배율 */
  sizeScale?: number;
  /** 상시 난류 강도(0에 가까울수록 얇은 획이 또렷) */
  jitter?: number;
  /** 비인터랙티브일 때 좌우 스윙 회전 여부(false=완전 정지) */
  rotate?: boolean;
  /** 비인터랙티브여도 클릭하면 흩어졌다 다시 모이는 동작(홈 박스용) */
  clickBurst?: boolean;
  /** HTML 컨트롤에서 버스트를 요청할 때 증가시키는 값. */
  burstSignal?: number;
  /** 파티클 좌표는 유지한 채 입장 응집 애니메이션을 다시 시작하는 값. */
  entranceSignal?: number;
  /** reduced-motion 환경처럼 입장 응집 모션을 생략할지 여부. */
  animateEntrance?: boolean;
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
  varying float vDepth;
  varying float vMotion;

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
    vDepth = smoothstep(-1.8, 1.8, base.z);
    vMotion = uProgress;

    // 흩어지는 동안 크기를 보강해 넓게 퍼진 입자도 사라지지 않게 한다.
    float glint = smoothstep(0.86, 1.0, aRandom);
    float size = (mix(6.2, 11.8, aRandom) + glint * 1.6) * mix(1.0, 1.28, uProgress);
    // 카메라가 가까워져도 포인트가 거대한 원반으로 번지지 않도록 상한을 둔다.
    gl_PointSize = min(size * uSizeScale * (8.0 / -mv.z), uMaxSize);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorCool;
  uniform vec3 uColorGlint;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    // 딥 바이올렛 몸체에 쿨 블루 깊이감과 라일락 반사광을 겹친다.
    float palette = fract(vRand * 1.618 + vDepth * 0.24);
    vec3 col = palette < 0.62
      ? mix(uColorDeep, uColorMid, palette / 0.62)
      : mix(uColorMid, uColorCool, (palette - 0.62) / 0.38);

    float body = pow(smoothstep(0.5, 0.02, d), 1.35);
    float rim = smoothstep(0.49, 0.34, d) - smoothstep(0.31, 0.16, d);
    float glintSeed = smoothstep(0.86, 1.0, vRand);
    float specular = pow(
      smoothstep(0.22, 0.0, length(c - vec2(-0.14, 0.14))),
      2.4
    ) * glintSeed;

    // 모든 입자를 발광시키지 않고 가장자리와 일부 반사점만 밝힌다.
    float reflection = min(rim * 0.2 + specular * 0.72, 0.78);
    col = mix(col, uColorGlint, reflection);

    // 응집 상태는 반투명하게, 흩어진 상태는 더 선명하게 유지한다.
    float density = mix(0.7, 0.92, fract(vRand * 7.13));
    float alpha = min(
      body * density * mix(0.82, 1.12, vMotion) + rim * 0.08 + specular * 0.12,
      0.94
    );
    gl_FragColor = vec4(col, alpha);
  }
`;

const glintFragmentShader = /* glsl */ `
  uniform vec3 uColorCool;
  uniform vec3 uColorGlint;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    float glintSeed = smoothstep(0.86, 1.0, vRand);
    if (glintSeed <= 0.01) discard;

    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float body = pow(smoothstep(0.5, 0.0, d), 1.65);
    float specular = pow(
      smoothstep(0.25, 0.0, length(c - vec2(-0.14, 0.14))),
      2.1
    );
    vec3 col = mix(uColorCool, uColorGlint, min(specular + vDepth * 0.2, 1.0));
    float alpha = min(
      (body * 0.34 + specular * 0.72) * glintSeed * mix(0.78, 1.2, vMotion),
      0.88
    );
    gl_FragColor = vec4(col, alpha);
  }
`;

export function ParticleLogo({
  interactive = true,
  count = 40000,
  sizeScale = 0.07,
  jitter = 0.003,
  rotate = true,
  clickBurst = false,
  burstSignal = 0,
  entranceSignal = 0,
  animateEntrance = true,
}: ParticleLogoProps) {
  // 작고 또렷한 서명 스타일 — 포인트 최대 크기 상한(가까이서 원반화 방지).
  const finalMaxSize = 15;

  const { nodes } = useGLTF('/3D/nijoowPurple.glb');
  const logoMesh = nodes.Curve003;
  if (!(logoMesh instanceof THREE.Mesh)) {
    throw new Error('nijoow 로고 메시를 찾을 수 없습니다.');
  }

  const group = useRef<THREE.Group>(null);
  const burstRef = useRef(-Infinity);
  const autoRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const rotationStartedAtRef = useRef<number | null>(null);
  const lastBurstSignalRef = useRef(burstSignal);
  const lastEntranceSignalRef = useRef(entranceSignal);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const rand = mulberry32(0x9e3779b9);
    const mesh = new THREE.Mesh(logoMesh.geometry);
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

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScatter', new THREE.BufferAttribute(scatters, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    return geometry;
  }, [logoMesh, count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: animateEntrance ? 1 : 0 },
      uTime: { value: 0 },
      uSizeScale: { value: sizeScale },
      uJitterBase: { value: jitter },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uRadius: { value: 1.3 },
      uStrength: { value: 0.9 },
      uMaxSize: { value: finalMaxSize },
      uColorDeep: {
        value: new THREE.Color('#8b68df').multiplyScalar(1.15),
      },
      uColorMid: {
        value: new THREE.Color('#c4a5f0').multiplyScalar(1.15),
      },
      uColorCool: {
        value: new THREE.Color('#98a7f5').multiplyScalar(1.1),
      },
      uColorGlint: {
        value: new THREE.Color('#f0e5ff').multiplyScalar(1.25),
      },
    }),
    [animateEntrance, sizeScale, jitter, finalMaxSize],
  );

  useFrame((state) => {
    const absoluteTime = state.clock.elapsedTime;
    if (entranceSignal !== lastEntranceSignalRef.current) {
      lastEntranceSignalRef.current = entranceSignal;
      startedAtRef.current = absoluteTime;
      burstRef.current = -Infinity;
      autoRef.current = 0;
    }
    startedAtRef.current ??= absoluteTime;
    const t = absoluteTime - startedAtRef.current;

    // 입장: ENTRANCE_SEC 동안 흩어진 상태(1) → 응집(0), 큐빅 이즈로 천천히 안착.
    const entrance = animateEntrance
      ? 1 - THREE.MathUtils.clamp(t / ENTRANCE_SEC, 0, 1)
      : 0;
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
    if (clickBurst && burstSignal !== lastBurstSignalRef.current) {
      lastBurstSignalRef.current = burstSignal;
      autoRef.current = t;
      burstRef.current = t;
    }
    // 버스트 곡선: 모인 글자(0)에서 시작해 흩어졌다(피크) 다시 모인다(0).
    const since = t - burstRef.current;
    const bp = since >= 0 ? since / BURST_SEC : Infinity;
    const burst = bp <= 1 ? Math.sin(Math.PI * bp) * BURST_PEAK : 0;
    const progress = Math.max(eased, idle, pulse, burst);

    uniforms.uProgress.value = progress;
    uniforms.uTime.value = t;

    if (interactive) {
      // 마우스를 z=0 평면에 투영해 월드 좌표 산출(리펄전용).
      const cam = state.camera;
      mouseWorld.set(state.pointer.x, state.pointer.y, 0.5).unproject(cam);
      mouseWorld.sub(cam.position);
      const planeT = -cam.position.z / (mouseWorld.z || -1);
      mouseWorld.multiplyScalar(planeT).add(cam.position);
      uniforms.uMouse.value.copy(mouseWorld);
    }

    if (group.current) {
      if (interactive) {
        // 인트로: 느린 자전 + 포인터 패럴랙스
        group.current.rotation.y = t * 0.12 + state.pointer.x * 0.3;
        group.current.rotation.x = -state.pointer.y * 0.2;
      } else {
        // 클래식 로고: 정면을 유지하는 부드러운 좌우 스윙(글자 가독성). 드래그는 OrbitControls.
        // rotate=false면 완전 정지(인트로용).
        if (rotate) {
          rotationStartedAtRef.current ??= absoluteTime;
          const rotationTime = absoluteTime - rotationStartedAtRef.current;
          group.current.rotation.y = Math.sin(rotationTime * 0.3) * 0.5;
        } else {
          rotationStartedAtRef.current = null;
          group.current.rotation.y = 0;
        }
        group.current.rotation.x = 0;
      }
    }
  });

  return (
    <group ref={group} dispose={null}>
      <points geometry={geometry}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      <points geometry={geometry}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={glintFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

useGLTF.preload('/3D/nijoowPurple.glb');
