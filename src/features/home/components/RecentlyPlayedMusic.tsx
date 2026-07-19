'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { useNowPlaying } from '@/features/home/hooks/useNowPlaying';
import type { Music } from '@/features/home/schemas/spotifySchemas';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, History, Music2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const EQUALIZER_BARS = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  heights: [
    `${28 + Math.round(Math.abs(Math.sin(index)) * 55)}%`,
    `${36 + Math.round(Math.abs(Math.cos(index * 0.7)) * 60)}%`,
    `${24 + Math.round(Math.abs(Math.sin(index * 1.3)) * 68)}%`,
  ],
  duration: 0.9 + (index % 5) * 0.12,
  delay: index * 0.035,
}));

function MusicArtwork({
  music,
  shouldAnimate,
}: {
  music: Music;
  shouldAnimate: boolean;
}) {
  return (
    <div className="relative size-20 shrink-0 sm:size-22">
      <div className="bg-brand-violet/30 absolute inset-2 rounded-full blur-xl" />
      <m.div
        animate={shouldAnimate ? { rotate: 360 } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="ring-brand-lavender/15 relative size-full overflow-hidden rounded-full border-2 border-white/15 bg-black shadow-xl ring-1"
      >
        <Image
          src={music.albumImageUrl}
          fill
          alt={`${music.title} 앨범 커버`}
          sizes="(max-width: 640px) 80px, 88px"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-full border border-white/10"
        />
        <span
          aria-hidden="true"
          className="bg-surface-ink absolute top-1/2 left-1/2 flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/20 shadow-inner"
        >
          <span className="size-1.5 rounded-full bg-white/15" />
        </span>
      </m.div>
    </div>
  );
}

function RecentTrack({ music, index }: { music: Music; index: number }) {
  return (
    <a
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/track focus-visible:ring-brand-lavender flex min-w-0 items-center gap-3 rounded-xl px-2 py-2 transition-colors outline-none hover:bg-white/5 focus-visible:ring-2"
    >
      <span className="w-4 shrink-0 text-center text-[10px] font-bold text-white/50">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
        <Image
          src={music.albumImageUrl}
          fill
          alt=""
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="group-hover/track:text-brand-lavender truncate text-sm font-bold transition-colors">
          {music.title}
        </p>
        <p className="truncate text-xs text-white/55">{music.artist}</p>
      </div>
      <ExternalLink
        aria-hidden="true"
        className="size-3.5 shrink-0 text-white/20 transition-colors group-hover/track:text-white/60"
      />
    </a>
  );
}

function MusicCardSkeleton() {
  return (
    <GlassCard className="h-full min-h-96">
      <div className="flex h-full animate-pulse flex-col gap-5 p-5">
        <div className="flex gap-4">
          <div className="size-20 rounded-full bg-white/10 sm:size-22" />
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="h-5 w-2/3 rounded-full bg-white/10" />
            <div className="h-3 w-1/2 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="h-px bg-white/10" />
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-white/5" />
            <div className="h-3 flex-1 rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function RecentlyPlayedMusic() {
  const { data, isPending } = useNowPlaying();
  const shouldReduceMotion = useReducedMotion();
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef, { margin: '120px' });

  if (isPending) return <MusicCardSkeleton />;

  if (!data?.current) {
    return (
      <GlassCard className="h-full min-h-96">
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
          <span className="bg-brand-deep/35 text-brand-lavender flex size-12 items-center justify-center rounded-2xl border border-white/10">
            <Music2 size={20} />
          </span>
          <p className="font-bold">재생 정보를 불러오지 못했습니다</p>
          <p className="text-sm text-white/60">잠시 후 다시 시도해 주세요.</p>
        </div>
      </GlassCard>
    );
  }

  const { current, recent, isPlaying } = data;
  const shouldAnimate = isPlaying && isInView && !shouldReduceMotion;

  return (
    <div ref={animationRef} className="h-full">
      <GlassCard className="h-full min-h-96">
        <div className="relative flex h-full flex-col overflow-hidden p-5">
          <div className="bg-brand-deep/25 absolute -top-16 -left-14 size-48 rounded-full blur-3xl" />

          <a
            href={current.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/current focus-visible:ring-brand-lavender relative flex min-w-0 items-center gap-4 rounded-2xl outline-none focus-visible:ring-2"
          >
            <MusicArtwork music={current} shouldAnimate={shouldAnimate} />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest text-white/55 uppercase">
                <span className="bg-status-success shadow-status-success/60 size-2 rounded-full shadow-sm" />
                {isPlaying ? '지금 듣는 중' : '마지막으로 들은 곡'}
              </div>
              <h3 className="group-hover/current:text-brand-lavender truncate text-lg font-black transition-colors sm:text-xl">
                {current.title}
              </h3>
              <p className="text-brand-lavender/80 truncate text-sm font-semibold">
                {current.artist}
              </p>
              <div className="mt-3 flex h-5 items-end gap-0.5 overflow-hidden">
                {EQUALIZER_BARS.map((bar) => (
                  <m.span
                    key={bar.id}
                    className="bg-brand-lavender/85 w-1.5 rounded-t-xs"
                    animate={
                      shouldAnimate
                        ? { height: bar.heights }
                        : { height: bar.heights[0] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: bar.duration,
                      delay: bar.delay,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>
            <ExternalLink className="size-4 shrink-0 self-start text-white/30 transition-colors group-hover/current:text-white/70" />
          </a>

          <div className="relative my-5 h-px bg-white/10" />

          <div className="relative flex items-center justify-between px-2">
            <span className="flex items-center gap-2 text-xs font-extrabold text-white/55">
              <History size={13} /> 최근 들은 음악
            </span>
            <span className="text-brand-lavender/60 text-[10px] font-bold tracking-widest uppercase">
              Spotify
            </span>
          </div>

          <div className="relative mt-2 flex flex-1 flex-col justify-center">
            {recent.length > 0 ? (
              recent.map((music, index) => (
                <RecentTrack
                  key={`${music.songUrl}-${index}`}
                  music={music}
                  index={index}
                />
              ))
            ) : (
              <p className="px-2 py-5 text-sm text-white/60">
                최근 들은 음악이 아직 없습니다.
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
