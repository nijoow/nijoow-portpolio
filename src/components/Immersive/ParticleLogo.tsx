'use client';

import { COLOR_TOKENS } from '@/lib/designTokens';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type {
  ParticleGeometryRequest,
  ParticleGeometryResult,
} from './particleGeometry.types';

const ENTRANCE_SEC = 3;
const BURST_SEC = 2.4;
const BURST_PEAK = 0.95;
const AUTO_BURST_SEC = 10;
const IDLE_WAVE_AMP = 0.06;
const PULSE_AMP = 0.4;
const INTRO_SPIN_SPEED = 0.12;
const POINTER_TILT_X = 0.3;
const POINTER_TILT_Y = 0.2;
const SWING_SPEED = 0.3;
const SWING_AMP = 0.5;

const MAX_POINT_SIZE = 15;

// 정적 팔레트 — props와 무관하므로 모듈 수준에서 1회 생성해 모든 인스턴스가 공유한다.
const PARTICLE_COLORS = {
  deep: new THREE.Color(COLOR_TOKENS.brand.violet).multiplyScalar(1.08),
  mid: new THREE.Color(COLOR_TOKENS.brand.lavender).multiplyScalar(1.08),
  cool: new THREE.Color(COLOR_TOKENS.brand.cool).multiplyScalar(1.05),
  glint: new THREE.Color(COLOR_TOKENS.brand.lavender).multiplyScalar(1.14),
} as const;

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
  /** Worker가 좌표 생성을 마쳐 첫 프레임을 그릴 준비가 되었을 때 호출한다. */
  onReady?: () => void;
}

/** 입장 응집: ENTRANCE_SEC 동안 1→0, 큐빅 이즈로 천천히 안착. */
function entranceEnvelope(t: number): number {
  const entrance = 1 - THREE.MathUtils.clamp(t / ENTRANCE_SEC, 0, 1);
  return entrance * entrance * entrance;
}

/** 인터랙티브 유휴 시 미세 흩어짐 파형. */
function idleWave(t: number): number {
  return (Math.sin(t * 0.5) * 0.5 + 0.5) * IDLE_WAVE_AMP;
}

/** 인터랙티브 주기적 펄스(간헐적으로 크게 숨쉬는 효과). */
function pulseWave(t: number): number {
  return Math.pow(Math.max(0, Math.sin(t * 0.7)), 10) * PULSE_AMP;
}

/** 버스트 곡선: 모인 글자(0)→흩어짐(피크)→다시 모임(0). */
function burstEnvelope(sinceBurst: number): number {
  const bp = sinceBurst / BURST_SEC;
  return bp >= 0 && bp <= 1 ? Math.sin(Math.PI * bp) * BURST_PEAK : 0;
}

/** 포인터(NDC)를 z=0 평면의 월드 좌표로 투영한다(리펄전용). */
function projectPointerToWorld(state: RootState, out: THREE.Vector3) {
  const cam = state.camera;
  out.set(state.pointer.x, state.pointer.y, 0.5).unproject(cam);
  out.sub(cam.position);
  const planeT = -cam.position.z / (out.z || -1);
  out.multiplyScalar(planeT).add(cam.position);
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

// glint 패스는 GLINT_THRESHOLD를 넘는 입자만 담은 서브셋 geometry로 그리므로
// 셰이더에서 나머지 입자를 discard할 필요가 없다.
const glintFragmentShader = /* glsl */ `
  uniform vec3 uColorCool;
  uniform vec3 uColorGlint;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float glintSeed = smoothstep(0.86, 1.0, vRand);
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
  onReady,
}: ParticleLogoProps) {
  const { nodes } = useGLTF('/3D/nijoowPurple.glb');
  const logoMesh = nodes.Curve003;
  if (!(logoMesh instanceof THREE.Mesh)) {
    throw new Error('nijoow 로고 메시를 찾을 수 없습니다.');
  }

  const group = useRef<THREE.Group>(null);
  const bodyMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const glintMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const burstRef = useRef(-Infinity);
  const autoRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const rotationStartedAtRef = useRef<number | null>(null);
  const lastBurstSignalRef = useRef(burstSignal);
  const lastEntranceSignalRef = useRef(entranceSignal);
  const [geometryData, setGeometryData] =
    useState<ParticleGeometryResult | null>(null);
  // 매 프레임 통째로 덮어쓰는 스크래치 버퍼 — 캐싱이 아니라 안정된 정체성이
  // 목적이므로 useMemo가 아닌 ref로 유지한다.
  const mouseWorldRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const worker = new Worker(
      new URL('./particleGeometry.worker.ts', import.meta.url),
      { type: 'module' },
    );
    const sourcePositions = new Float32Array(
      logoMesh.geometry.getAttribute('position').array,
    );
    const sourceIndices = logoMesh.geometry.index
      ? new Uint32Array(logoMesh.geometry.index.array)
      : null;
    const request: ParticleGeometryRequest = {
      positions: sourcePositions,
      indices: sourceIndices,
      count,
    };
    const transfer: Transferable[] = [sourcePositions.buffer];
    if (sourceIndices) transfer.push(sourceIndices.buffer);

    worker.onmessage = (event: MessageEvent<ParticleGeometryResult>) => {
      setGeometryData(event.data);
    };
    worker.onerror = (event) => {
      console.error('Particle geometry worker failed', event.error);
    };
    worker.postMessage(request, transfer);

    return () => worker.terminate();
  }, [count, logoMesh.geometry]);

  // Worker가 만든 typed array를 GPU geometry로 연결하는 작업만 메인 스레드에서 수행한다.
  const geometries = useMemo(() => {
    if (!geometryData) return null;

    const full = new THREE.BufferGeometry();
    full.setAttribute(
      'position',
      new THREE.BufferAttribute(geometryData.positions, 3),
    );
    full.setAttribute(
      'aScatter',
      new THREE.BufferAttribute(geometryData.scatters, 3),
    );
    full.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(geometryData.randoms, 1),
    );

    const glint = new THREE.BufferGeometry();
    glint.setAttribute(
      'position',
      new THREE.BufferAttribute(geometryData.glintPositions, 3),
    );
    glint.setAttribute(
      'aScatter',
      new THREE.BufferAttribute(geometryData.glintScatters, 3),
    );
    glint.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(geometryData.glintRandoms, 1),
    );

    return { full, glint };
  }, [geometryData]);

  useEffect(() => {
    if (!geometries) return;
    onReady?.();
    return () => {
      geometries.full.dispose();
      geometries.glint.dispose();
    };
  }, [geometries, onReady]);

  // group에 dispose={null}을 걸어 r3f 자동 정리를 껐으므로 material도 직접 정리한다.
  useEffect(() => {
    if (!geometries) return;
    const bodyMaterial = bodyMaterialRef.current;
    const glintMaterial = glintMaterialRef.current;
    return () => {
      bodyMaterial?.dispose();
      glintMaterial?.dispose();
    };
  }, [geometries]);

  // 두 material이 같은 uniforms 객체를 공유한다 — useFrame에서 한 번만 갱신하면
  // 본체·glint 패스에 동시에 반영된다. 실수로 분리하지 말 것.
  const uniforms = useMemo(
    () => ({
      uProgress: { value: animateEntrance ? 1 : 0 },
      uTime: { value: 0 },
      uSizeScale: { value: sizeScale },
      uJitterBase: { value: jitter },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uRadius: { value: 1.3 },
      uStrength: { value: 0.9 },
      uMaxSize: { value: MAX_POINT_SIZE },
      uColorDeep: { value: PARTICLE_COLORS.deep },
      uColorMid: { value: PARTICLE_COLORS.mid },
      uColorCool: { value: PARTICLE_COLORS.cool },
      uColorGlint: { value: PARTICLE_COLORS.glint },
    }),
    [animateEntrance, sizeScale, jitter],
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

    if (clickBurst && t - autoRef.current >= AUTO_BURST_SEC) {
      autoRef.current = t;
      burstRef.current = t;
    }
    if (clickBurst && burstSignal !== lastBurstSignalRef.current) {
      lastBurstSignalRef.current = burstSignal;
      autoRef.current = t;
      burstRef.current = t;
    }

    // progress = 여러 모션 소스(입장·유휴·펄스·버스트) 중 가장 큰 흩어짐.
    const progress = Math.max(
      animateEntrance ? entranceEnvelope(t) : 0,
      interactive ? idleWave(t) : 0,
      interactive ? pulseWave(t) : 0,
      burstEnvelope(t - burstRef.current),
    );
    uniforms.uProgress.value = progress;
    uniforms.uTime.value = t;

    if (interactive) {
      projectPointerToWorld(state, mouseWorldRef.current);
      uniforms.uMouse.value.copy(mouseWorldRef.current);
    }

    if (!group.current) return;
    if (interactive) {
      // 인트로: 느린 자전 + 포인터 패럴랙스
      group.current.rotation.y =
        t * INTRO_SPIN_SPEED + state.pointer.x * POINTER_TILT_X;
      group.current.rotation.x = -state.pointer.y * POINTER_TILT_Y;
    } else {
      // 클래식 로고: 정면 유지 좌우 스윙(가독성). rotate=false면 완전 정지(인트로용).
      if (rotate) {
        rotationStartedAtRef.current ??= absoluteTime;
        const rotationTime = absoluteTime - rotationStartedAtRef.current;
        group.current.rotation.y =
          Math.sin(rotationTime * SWING_SPEED) * SWING_AMP;
      } else {
        rotationStartedAtRef.current = null;
        group.current.rotation.y = 0;
      }
      group.current.rotation.x = 0;
    }
  });

  if (!geometries) return null;

  return (
    <group ref={group} dispose={null}>
      <points geometry={geometries.full}>
        <shaderMaterial
          ref={bodyMaterialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      <points geometry={geometries.glint}>
        <shaderMaterial
          ref={glintMaterialRef}
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
