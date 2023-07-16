import { useGetNowPlaying } from '@/hooks/useGetNowPlaying'
import { useGetRecentlyPlayed } from '@/hooks/useGetRecentlyPlayed'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const NowPlaying = () => {
  const { loading: nowPlayingLoading, song: nowPlayingSong } =
    useGetNowPlaying()
  const { loading: recentlyPlayedLoading, song: recentlyPlayedSong } =
    useGetRecentlyPlayed()

  if (nowPlayingSong) {
    return (
      <Link
        href={nowPlayingSong.songUrl}
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
            src={nowPlayingSong.albumImageUrl}
            sizes="33vw"
            fill
            unoptimized={true}
            alt={nowPlayingSong.title}
          />
        </div>
        <div className={'flex flex-col truncate text-white'}>
          <div className={'text-base truncate'}>{nowPlayingSong.title}</div>
          <div className={'text-sm text-gray-300 truncate'}>
            {nowPlayingSong.artist}
          </div>
        </div>
      </Link>
    )
  }
  if (recentlyPlayedSong) {
    return (
      <Link
        href={recentlyPlayedSong.songUrl}
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
            src={recentlyPlayedSong.albumImageUrl}
            sizes="33vw"
            fill
            unoptimized={true}
            alt={recentlyPlayedSong.title}
          />
        </div>
        <div className={'flex flex-col truncate text-white'}>
          <div className={'text-base truncate'}>{recentlyPlayedSong.title}</div>
          <div className={'text-sm text-gray-300 truncate'}>
            {recentlyPlayedSong.artist}
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div
      className={
        'flex bg-black w-full items-center rounded-xl max-w-md overflow-hidden'
      }
    />
  )
}

export default NowPlaying
