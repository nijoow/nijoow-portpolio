'use client';

import { musicAtom } from '@/store/atoms';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  if (loading)
    return (
      <div
        className={
          'flex w-full max-w-md items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'
        }
      >
        <div
          className={
            'relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/5 dark:bg-white/10'
          }
        >
          <span className="text-4xl">🎵</span>
        </div>
        <div className="dark:text-purple-light/80 flex-auto text-sm text-gray-500">
          음악 정보를 불러오는 중입니다...
        </div>
      </div>
    );
  if (music === null)
    return (
      <div
        className={
          'flex w-full max-w-md items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5'
        }
      >
        <div
          className={
            'relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/5 dark:bg-white/10'
          }
        >
          <span className="text-4xl">😭</span>
        </div>
        <div className="dark:text-purple-light/80 flex-auto text-sm text-gray-500">
          현재 곡을 표시할 수 없습니다ㅠㅠ
        </div>
      </div>
    );

  return (
    <Link
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-2xl border border-black/5 bg-black/5 px-4 py-4 backdrop-blur-md transition-all hover:bg-black/10 md:gap-8 md:px-8 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
      }
    >
      <div
        className={
          'bg-purple-medium/30 group-hover:bg-purple-medium/50 absolute top-0 -left-4 -z-10 size-32 rounded-full blur-3xl transition-opacity md:size-40'
        }
      />

      <div className={'relative size-20 shrink-0 md:size-32'}>
        <motion.div
          layoutId="glow"
          className={'bg-purple-light/50 absolute inset-0 rounded-full blur-xl'}
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
            unoptimized={true}
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
            'dark:text-purple-light/80 mb-2 truncate text-sm text-gray-500'
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
