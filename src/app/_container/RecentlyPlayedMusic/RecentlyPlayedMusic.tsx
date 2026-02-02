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
  }, []);

  if (loading)
    return (
      <div
        className={
          'flex w-full max-w-md items-center gap-3 rounded-lg bg-gray-800 p-2.5 sm:rounded-xl'
        }
      >
        <div
          className={
            'relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-800'
          }
        >
          <span className="text-6xl">🎵</span>
        </div>
        <div className="flex-auto">음악 정보를 불러오는 중입니다...</div>
      </div>
    );
  if (music === null)
    return (
      <div
        className={
          'flex w-full max-w-md items-center gap-3 rounded-lg bg-gray-800 p-2.5 sm:rounded-xl'
        }
      >
        <div
          className={
            'relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-800'
          }
        >
          <span className="text-6xl">😭</span>
        </div>
        <div className="flex-auto">현재 곡을 표시할 수 없습니다ㅠㅠ</div>
      </div>
    );

  return (
    <Link
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'flex w-full max-w-md items-center gap-3 rounded-xl bg-gray-800 p-2.5'
      }
    >
      <div className={'relative h-24 w-24 shrink-0 overflow-hidden rounded-md'}>
        <Image
          src={music.albumImageUrl}
          fill
          unoptimized={true}
          alt={music.title}
        />
      </div>
      <div
        className={
          'flex h-24 flex-auto flex-col justify-end truncate pb-1 text-white'
        }
      >
        <div className={'mt-auto truncate text-base'}>{music.title}</div>
        <div className={'mb-auto truncate text-sm text-gray-300'}>
          {music.artist}
        </div>
        <div className="flex h-4 w-full gap-0.5">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-full w-1 bg-green-500"
              animate={{
                transformOrigin: 'bottom',
                scaleY: ['100%', '40%', '100%'],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: Math.random() * 1,
              }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecentlyPlayedMusic;
