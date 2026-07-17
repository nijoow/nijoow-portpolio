'use client';

import Logo from '@/components/Logo/Logo';
import { cn } from '@/lib/utils';
import { OrbitControls, Sparkles, View } from '@react-three/drei';
import { Canvas, type RootState } from '@react-three/fiber';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Move3d, RotateCcw, SparklesIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Component,
  type ComponentRef,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ParticleLogo } from './ParticleLogo';

const INTRO_SEEN_KEY = 'nijoow-intro-seen-v2';
const ASSEMBLE_MS = 3200;
const LANDING_MS = 1350;

type StagePhase = 'intro' | 'landing' | 'hero';
type Quality = 'high' | 'medium' | 'low' | 'fallback';

interface QualityConfig {
  count: number;
  dpr: [number, number];
  sparkles: number;
}

const QUALITY_CONFIG: Record<Exclude<Quality, 'fallback'>, QualityConfig> = {
  high: { count: 40000, dpr: [1, 1.5], sparkles: 30 },
  medium: { count: 24000, dpr: [1, 1.25], sparkles: 22 },
  low: { count: 12000, dpr: [1, 1], sparkles: 12 },
};

const CANVAS_GL_CONFIG = {
  alpha: true,
  antialias: false,
  powerPreference: 'high-performance' as const,
};
const CAMERA_CONFIG = {
  position: [0, 0, 2.8] as [number, number, number],
  fov: 42,
};
const INTRO_SPARKLES_SCALE: [number, number, number] = [16, 10, 6];
const HERO_SPARKLES_SCALE: [number, number, number] = [9, 4.5, 4];

function makeCanvasTransparent({ gl }: RootState) {
  gl.setClearColor('#000000', 0);
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

function detectQuality(): Quality {
  if (!canUseWebGL()) return 'fallback';

  const isReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const isSmall = window.innerWidth < 640;
  const hasFewCores = navigator.hardwareConcurrency <= 4;
  const hasMediumCores = navigator.hardwareConcurrency <= 8;
  const savesData =
    'connection' in navigator &&
    typeof navigator.connection === 'object' &&
    navigator.connection !== null &&
    'saveData' in navigator.connection &&
    navigator.connection.saveData === true;

  if (isReduced || isSmall || hasFewCores || savesData) return 'low';
  if (hasMediumCores || window.devicePixelRatio > 2) return 'medium';
  return 'high';
}

function hasSeenIntro() {
  try {
    return window.localStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return true;
  }
}

function markIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // 저장이 차단된 환경에서는 현재 방문에서만 정상 종료한다.
  }
}

function getRouteCopy(pathname: string) {
  if (pathname === '/works') {
    return { eyebrow: 'Archived Project', title: 'Design × Development' };
  }
  if (pathname === '/contact') {
    return { eyebrow: 'Let’s Connect', title: 'Ideas into experience' };
  }
  if (pathname.startsWith('/works/')) {
    return { eyebrow: 'Case Study', title: 'Designed with intent' };
  }
  return { eyebrow: 'Frontend Developer', title: '이우진 · nijoow' };
}

function SignatureFallbackArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="bg-purple-medium/15 absolute size-56 rounded-full blur-3xl" />
      <Logo
        width={240}
        height={135}
        className="relative opacity-90 drop-shadow-2xl"
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SignatureErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Signature WebGL scene failed', error, info);
  }

  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function SignatureExperience() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);
  const orbitControlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const [quality] = useState<Quality>(detectQuality);
  const [phase, setPhase] = useState<StagePhase>(() => {
    const shouldPlay =
      pathname === '/' &&
      quality !== 'fallback' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !hasSeenIntro();
    return shouldPlay ? 'intro' : 'hero';
  });
  const [introRun, setIntroRun] = useState(0);
  const [burstSignal, setBurstSignal] = useState(0);
  const [isInView, setIsInView] = useState(true);

  const routeCopy = getRouteCopy(pathname);
  const isIntro = phase === 'intro';
  const isHero = phase === 'hero';
  const isCinematic = phase !== 'hero';
  const config = quality === 'fallback' ? null : QUALITY_CONFIG[quality];

  useEffect(() => {
    const element = wrapRef.current;
    if (!element || isCinematic) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? true),
      { rootMargin: '120px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isCinematic]);

  useEffect(() => {
    if (!isIntro) return;
    const timer = window.setTimeout(() => setPhase('landing'), ASSEMBLE_MS);
    return () => window.clearTimeout(timer);
  }, [isIntro, introRun]);

  useEffect(() => {
    orbitControlsRef.current?.reset();
  }, [introRun]);

  useEffect(() => {
    if (phase !== 'landing') return;
    const timer = window.setTimeout(() => {
      markIntroSeen();
      setPhase('hero');
    }, LANDING_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleLanding = () => setPhase('landing');

  const handleReplay = () => {
    setIntroRun((run) => run + 1);
    setPhase('intro');
  };

  const handleBurst = () => setBurstSignal((signal) => signal + 1);

  return (
    <>
      <m.section
        ref={wrapRef}
        layout
        initial={false}
        animate={{ borderRadius: isIntro ? 0 : 24 }}
        transition={{
          layout: { duration: 1.35, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        }}
        aria-label="nijoow 시그니처 로고"
        className={cn(
          'overflow-hidden bg-black',
          isIntro
            ? 'fixed inset-0 z-100 border border-transparent'
            : 'relative z-10 mb-10 h-[240px] w-full border border-white/10 sm:h-[400px]',
        )}
      >
        {config ? (
          <SignatureErrorBoundary fallback={<SignatureFallbackArt />}>
            <View
              className="absolute inset-0"
              frames={reduced ? 1 : Infinity}
              visible={isInView || isCinematic}
            >
              <ambientLight intensity={0.8} />
              <OrbitControls
                ref={orbitControlsRef}
                enabled={isHero && !reduced}
                enablePan={false}
                minDistance={1.8}
                maxDistance={3}
              />
              <Suspense fallback={null}>
                <ParticleLogo
                  count={config.count}
                  interactive={false}
                  rotate={isHero && !reduced}
                  clickBurst={isHero && !reduced}
                  burstSignal={burstSignal}
                  entranceSignal={introRun}
                  animateEntrance={!reduced}
                  jitter={reduced ? 0 : 0.003}
                />
              </Suspense>
              <Sparkles
                count={config.sparkles}
                scale={isIntro ? INTRO_SPARKLES_SCALE : HERO_SPARKLES_SCALE}
                size={1.4}
                speed={reduced ? 0 : 0.3}
                color="#c0a8eb"
                opacity={0.4}
              />
            </View>
          </SignatureErrorBoundary>
        ) : (
          <SignatureFallbackArt />
        )}

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.55)]" />

        <AnimatePresence>
          {phase === 'landing' ? (
            <m.div
              key="landing-sweep"
              initial={{ x: '-140%', opacity: 0 }}
              animate={{ x: '140%', opacity: [0, 0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="via-purple-light/25 pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent blur-xl"
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {!isIntro ? (
            <m.div
              key="hero-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: phase === 'landing' ? 0.45 : 0,
              }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between gap-4 sm:right-7 sm:bottom-6 sm:left-7">
                <m.div
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: phase === 'landing' ? 0.65 : 0,
                  }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-purple-light/80 text-[10px] font-bold tracking-widest uppercase sm:text-xs">
                    {routeCopy.eyebrow}
                  </span>
                  <span className="text-lg font-black text-white sm:text-2xl">
                    {routeCopy.title === '이우진 · nijoow' ? (
                      <>
                        이우진 <span className="text-white/40">·</span>{' '}
                        <span className="from-purple-light to-purple-regular bg-linear-to-r bg-clip-text text-transparent">
                          nijoow
                        </span>
                      </>
                    ) : (
                      routeCopy.title
                    )}
                  </span>
                </m.div>

                <div className="pointer-events-auto flex items-center gap-1.5">
                  <span
                    aria-label="드래그해서 회전"
                    title="드래그해서 회전"
                    className="hidden size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 backdrop-blur-sm sm:flex"
                  >
                    <Move3d size={15} />
                  </span>
                  {!reduced && config ? (
                    <button
                      type="button"
                      onClick={handleBurst}
                      aria-label="파티클 흩기"
                      title="파티클 흩기"
                      className="hover:border-purple-light/40 hover:text-purple-light focus-visible:ring-purple-light flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm transition-colors outline-none focus-visible:ring-2"
                    >
                      <SparklesIcon size={15} />
                    </button>
                  ) : null}
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>

        {isIntro ? (
          <button
            type="button"
            onClick={handleLanding}
            className="border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 focus-visible:ring-purple-light absolute top-5 right-5 z-10 min-h-11 rounded-full border px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-xl transition-colors outline-none hover:text-white focus-visible:ring-2"
          >
            건너뛰기
          </button>
        ) : null}
      </m.section>

      {config ? (
        <SignatureErrorBoundary fallback={null}>
          <Canvas
            camera={CAMERA_CONFIG}
            dpr={config.dpr}
            frameloop={
              reduced ? 'demand' : isInView || isCinematic ? 'always' : 'never'
            }
            gl={CANVAS_GL_CONFIG}
            onCreated={makeCanvasTransparent}
            className={cn(
              '!pointer-events-none !fixed !inset-0 !h-screen !w-screen',
              isCinematic ? 'z-101' : 'z-11',
            )}
          >
            <View.Port />
          </Canvas>
        </SignatureErrorBoundary>
      ) : null}

      {pathname === '/' && isHero && isInView && !reduced && config ? (
        <button
          type="button"
          onClick={handleReplay}
          aria-label="인트로 다시 보기"
          title="인트로 다시 보기"
          className="group border-purple-light/25 bg-purple-medium/20 hover:bg-purple-medium/35 focus-visible:ring-purple-light fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full border text-white/70 shadow-lg backdrop-blur-xl transition-colors outline-none hover:text-white focus-visible:ring-2"
        >
          <RotateCcw
            size={18}
            className="transition-transform duration-500 group-hover:-rotate-180"
          />
        </button>
      ) : null}
    </>
  );
}
