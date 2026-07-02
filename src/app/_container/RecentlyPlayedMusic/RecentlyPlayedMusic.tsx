'use client';

import GlassCard from '@/components/Motion/GlassCard';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useNowPlaying } from './useNowPlaying';

// 이퀄라이저 막대 애니메이션 설정은 모듈 로드 시 1회만 생성한다 (렌더 중 Math.random 호출 방지).
const EQUALIZER_BARS = Array.from({ length: 64 }, (_, i) => ({
  id: i,
  heights: [
    `${40 + Math.random() * 80}%`,
    `${30 + Math.random() * 40}%`,
    `${40 + Math.random() * 80}%`,
  ],
  duration: 0.8 + Math.random() * 0.7,
  delay: i * 0.02,
}));

const RecentlyPlayedMusic = () => {
  const { data: music, isPending } = useNowPlaying();

  if (isPending)
    return (
      <GlassCard className="w-full">
        <div className="flex w-full items-center justify-center gap-6 px-4 py-4 md:gap-8 md:px-8">
          <div className="bg-purple-medium/25 absolute top-0 -left-4 size-32 rounded-full blur-3xl md:size-40" />
          <div className="relative size-20 shrink-0 md:size-32">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white/5 shadow-lg md:size-32"
            >
              <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
                🎵
              </div>
            </motion.div>
          </div>
          <div className="flex h-20 flex-auto flex-col justify-center">
            <div className="animate-pulse">
              <div className="mb-2 h-5 w-32 rounded-full bg-white/10" />
              <div className="h-4 w-48 rounded-full bg-white/5" />
            </div>
          </div>
        </div>
      </GlassCard>
    );

  if (!music)
    return (
      <GlassCard className="w-full">
        <div className="flex w-full items-center justify-center gap-6 px-4 py-4 md:gap-8 md:px-8">
          <div className="bg-purple-medium/25 absolute top-0 -left-4 size-32 rounded-full blur-3xl md:size-40" />
          <div className="relative size-20 shrink-0 md:size-32">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-white/5 shadow-lg md:size-32">
              <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
                😭
              </div>
            </div>
          </div>
          <div className="flex h-20 flex-auto flex-col justify-center">
            <div className="text-base font-bold text-white">
              현재 곡을 표시할 수 없습니다
            </div>
            <div className="text-purple-light/60 text-sm">
              나중에 다시 확인해 주세요ㅠㅠ
            </div>
          </div>
        </div>
      </GlassCard>
    );

  return (
    <Link
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      <GlassCard className="w-full">
        <div className="flex w-full items-center justify-center gap-6 px-4 py-4 md:gap-8 md:px-8">
          {/* 앨범 아트 뒤 퍼플 글로우 — 카드 정체성 컬러 */}
          <div className="bg-purple-medium/25 group-hover:bg-purple-medium/40 absolute top-0 -left-4 size-32 rounded-full blur-3xl transition-colors md:size-40" />

          <div className="relative size-20 shrink-0 md:size-32">
            <motion.div
              className="bg-purple-light/50 absolute inset-0 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 shadow-lg md:size-32"
            >
              <Image
                src={music.albumImageUrl}
                fill
                alt={music.title}
                className="object-cover"
              />
              <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-gray-900 shadow-inner" />
            </motion.div>
          </div>

          <div className="flex h-20 min-w-0 flex-auto flex-col justify-center truncate">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <div className="truncate text-base font-bold text-white">
                {music.title}
              </div>
            </div>
            <div className="text-purple-light/80 mb-2 truncate text-sm font-semibold">
              {music.artist}
            </div>

            <div className="flex h-5 w-full items-end gap-0.5 overflow-hidden pb-1">
              {EQUALIZER_BARS.map((bar) => (
                <motion.div
                  key={bar.id}
                  className="from-purple-medium to-purple-light w-1 rounded-full bg-linear-to-t"
                  animate={{ height: bar.heights }}
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

          {/* Spotify로 이동하는 카드임을 알리는 우측 어포던스 */}
          <div className="hidden shrink-0 flex-col items-center gap-1.5 self-center md:flex">
            <span className="group-hover:border-purple-light/40 group-hover:text-purple-light flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-sm transition-colors">
              <ExternalLink size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest text-white/35 uppercase">
              Spotify
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export default RecentlyPlayedMusic;
