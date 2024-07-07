'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { musicAtom } from '@/recoil/atoms'
import { motion } from 'framer-motion'

const RecentlyPlayedMusic = () => {
  const [music, setMusic] = useRecoilState(musicAtom)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSongApis = async () => {
      try {
        const currentlyPlayingSong = await (
          await fetch('/api/spotify/currently-playing')
        ).json()
        const recentlyPlayedSong = await (
          await fetch('/api/spotify/recently-played')
        ).json()
        setLoading(false)
        setMusic(currentlyPlayingSong.payload ?? recentlyPlayedSong.payload)
      } catch (error) {
        setMusic(null)
      }
    }
    getSongApis()
    const getSong = setInterval(() => getSongApis(), 30000)

    return () => clearInterval(getSong)
  }, [])

  if (loading)
    return (
      <div
        className={
          'flex bg-gray-700 w-full items-center rounded-xl max-w-md p-2.5 gap-3'
        }
      >
        <div
          className={
            'rounded-md w-24 h-24 overflow-hidden relative shrink-0 flex items-center justify-center bg-gray-500'
          }
        >
          <span className="text-6xl">🎵</span>
        </div>
        <div className="flex-auto">음악 정보를 불러오는 중입니다...</div>
      </div>
    )
  if (music === null)
    return (
      <div
        className={
          'flex bg-gray-700 w-full items-center rounded-xl max-w-md p-2.5 gap-3'
        }
      >
        <div
          className={
            'rounded-md w-24 h-24 overflow-hidden relative shrink-0 flex items-center justify-center bg-gray-500'
          }
        >
          <span className="text-6xl">😭</span>
        </div>
        <div className="flex-auto">현재 곡을 표시할 수 없습니다ㅠㅠ</div>
      </div>
    )

  return (
    <Link
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'flex bg-gray-700 w-full items-center rounded-xl max-w-md p-2.5 gap-3'
      }
    >
      <div className={'rounded-md w-24 h-24 overflow-hidden relative shrink-0'}>
        <Image
          src={music.albumImageUrl}
          fill
          unoptimized={true}
          alt={music.title}
        />
      </div>
      <div
        className={
          'flex flex-col flex-auto truncate text-white h-24 justify-end pb-1'
        }
      >
        <div className={'text-base truncate mt-auto'}>{music.title}</div>
        <div className={'text-sm text-gray-300 truncate mb-auto'}>
          {music.artist}
        </div>
        <div className="w-full h-4 flex gap-0.5">
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
  )
}

export default RecentlyPlayedMusic
