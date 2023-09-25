'use client'
import React, { useEffect, useState } from 'react'
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
          'flex bg-black w-full items-center rounded-xl max-w-md overflow-hidden'
        }
      />
    )

  return (
    <Link
      href={music.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        'flex bg-black w-full items-center rounded-xl max-w-md overflow-hidden'
      }
    >
      <div
        className={
          'rounded-md w-24 h-24 overflow-hidden relative m-2.5 min-w-[6rem]'
        }
      >
        <Image
          src={music.albumImageUrl}
          sizes="33vw"
          fill
          unoptimized={true}
          alt={music.title}
        />
      </div>
      <div className={'flex flex-col truncate text-white'}>
        <div className={'text-base truncate'}>{music.title}</div>
        <div className={'text-sm text-gray-300 truncate'}>{music.artist}</div>
      </div>
    </Link>
  )
}

export default RecentlyPlayedMusic
