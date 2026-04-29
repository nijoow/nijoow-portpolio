'use client';

import { musicAtom } from '@/store/atoms';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const RecentlyPlayedMusic = () => {
  const [music, setMusic] = useAtom(musicAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongApis = async () => {
      try {
        const currentlyPlayingSong = await (
          await fetch('/api/spotify/currently-playing')
        ).json();
        const recentlyPlayedSong = await (
          await fetch('/api/spotify/recently-played')
        ).json();
        setLoading(false);
        setMusic(currentlyPlayingSong.payload ?? recentlyPlayedSong.payload);
      } catch (error) {
        setMusic(null);
      }
    };
    getSongApis();
    const getSong = setInterval(() => getSongApis(), 30000);

    return () => clearInterval(getSong);
  }, [setMusic]);

  const cardRef = useRef<HTMLAnchorElement>(null);

  // Mouse tracking for interactive glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transformations for dynamic movement
  const blobX = useTransform(springX, [0, 1], ['15%', '-15%']);
  const blobY = useTransform(springY, [0, 1], ['15%', '-15%']);

  const cursorBlobX = useTransform(springX, [0, 1], ['0%', '100%']);
  const cursorBlobY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (loading)
    return (
      <div
        className={
          'group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg backdrop-blur-xl transition-all md:gap-8 md:px-8 dark:border-white/10'
        }
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-40" />
        <div
          className={
            'bg-purple-medium/30 absolute top-0 -left-4 -z-10 size-32 rounded-full blur-3xl md:size-40'
          }
        />
        <div className={'relative size-20 shrink-0 md:size-32'}>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-black/5 shadow-lg md:size-32 dark:bg-white/5'
            }
          >
            <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
              🎵
            </div>
          </motion.div>
        </div>
        <div className={'flex h-20 flex-auto flex-col justify-center'}>
          <div className="animate-pulse">
            <div className="mb-2 h-5 w-32 rounded-full bg-gray-200 dark:bg-white/10" />
            <div className="h-4 w-48 rounded-full bg-gray-100 dark:bg-white/5" />
          </div>
        </div>
      </div>
    );

  if (music === null)
    return (
      <div
        className={
          'group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg backdrop-blur-xl transition-all md:gap-8 md:px-8 dark:border-white/10'
        }
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-40" />
        <div
          className={
            'bg-purple-medium/30 absolute top-0 -left-4 -z-10 size-32 rounded-full blur-3xl md:size-40'
          }
        />
        <div className={'relative size-20 shrink-0 md:size-32'}>
          <div
            className={
              'relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-black/5 shadow-lg md:size-32 dark:bg-white/5'
            }
          >
            <div className="flex h-full w-full items-center justify-center text-4xl opacity-50">
              😭
            </div>
          </div>
        </div>
        <div className={'flex h-20 flex-auto flex-col justify-center'}>
          <div className="text-base font-bold text-gray-900 dark:text-white">
            현재 곡을 표시할 수 없습니다
          </div>
          <div className="dark:text-purple-light/60 text-sm text-gray-500">
            나중에 다시 확인해 주세요ㅠㅠ
          </div>
        </div>
      </div>
    );

  return (
    <Link
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg backdrop-blur-xl transition-all hover:bg-white/10 md:gap-8 md:px-8 dark:border-white/10'
      }
    >
      {/* Specular Highlight */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-40" />

      {/* Static Background Blob (As requested to keep) */}
      <div
        className={
          'bg-purple-medium/30 group-hover:bg-purple-medium/50 absolute top-0 -left-4 -z-10 size-32 rounded-full blur-3xl transition-opacity md:size-40'
        }
      />

      {/* Interactive Mouse Follower Blob */}
      <motion.div
        style={{
          left: cursorBlobX,
          top: cursorBlobY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="bg-purple-medium/20 pointer-events-none absolute -z-10 size-48 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
      />

      <div className={'relative size-20 shrink-0 md:size-32'}>
        <motion.div
          layoutId="glow"
          style={{ x: blobX, y: blobY }}
          className={
            'bg-purple-light/50 absolute inset-0 -z-10 rounded-full blur-xl'
          }
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
          className={
            'relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 shadow-lg md:size-32'
          }
        >
          <Image
            src={music.albumImageUrl}
            fill
            alt={music.title}
            className={'object-cover'}
          />
          <div
            className={
              'absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-gray-900 shadow-inner'
            }
          />
        </motion.div>
      </div>

      <div className={'flex h-20 flex-auto flex-col justify-center truncate'}>
        <div className={'flex items-center gap-2'}>
          <span
            className={
              'flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'
            }
          />
          <div
            className={
              'truncate text-base font-bold text-gray-900 dark:text-white'
            }
          >
            {music.title}
          </div>
        </div>
        <div
          className={
            'dark:text-purple-light/80 mb-2 truncate text-sm font-semibold text-gray-500'
          }
        >
          {music.artist}
        </div>

        <div className="flex h-5 w-full items-end gap-0.5 overflow-hidden pb-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="from-purple-medium to-purple-light w-1 rounded-full bg-linear-to-t"
              animate={{
                height: [
                  `${40 + Math.random() * 80}%`,
                  `${30 + Math.random() * 40}%`,
                  `${40 + Math.random() * 80}%`,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + Math.random() * 0.7,
                delay: i * 0.02,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecentlyPlayedMusic;
