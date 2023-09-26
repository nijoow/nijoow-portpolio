'use client'
import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Song {
  title: string
  artist: string
  albumImageUrl: string
  songUrl: string
}

const RecentlyPlayedMusic = () => {
  const [music, setMusic] = useState<null | Song>(null)

  useEffect(() => {
    const getSongApis = async () => {
      const currentlyPlayingSong = await (
        await fetch('/api/spotify/currently-playing')
      ).json()
      const recentlyPlayedSong = await (
        await fetch('/api/spotify/recently-played')
      ).json()
      setMusic(currentlyPlayingSong ?? recentlyPlayedSong)
    }
    getSongApis()
    const getSong = setInterval(() => getSongApis(), 30000)

    return () => clearInterval(getSong)
  }, [])

  if (music === null)
    return (
      <div
        className={
          'flex bg-gray-700 w-full items-center rounded-xl max-w-md p-2.5 gap-3'
        }
      >
        <div
          className={
            'rounded-md w-24 h-24 overflow-hidden relative shrink-0 flex items-center text-6xl justify-center bg-gray-500'
          }
        >
          😭
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
      <div className={'flex flex-col flex-auto truncate text-white'}>
        <div className={'text-base truncate'}>{music.title}</div>
        <div className={'text-sm text-gray-300 truncate'}>{music.artist}</div>
      </div>
    </Link>
  )
}

export default RecentlyPlayedMusic
