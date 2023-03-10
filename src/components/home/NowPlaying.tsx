import { useGetNowPlaying } from '@hooks/useGetNowPlaying';
import { useGetRecentlyPlayed } from '@hooks/useGetRecentlyPlayed';
import React from 'react';
import styles from '@styles/home/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
export default function NowPlaying() {
  const { loading: nowPlayingLoading, song: nowPlayingSong } = useGetNowPlaying();
  const { loading: recentlyPlayedLoading, song: recentlyPlayedSong } = useGetRecentlyPlayed();

  return (
    <Link
      href={nowPlayingSong ? nowPlayingSong.songUrl : recentlyPlayedSong?.songUrl ?? '/'}
      target="_blank"
      rel="noopener noreferrer"
      className={'flex bg-black w-full items-center rounded-xl max-w-md overflow-hidden'}
    >
      <div className={'rounded-md w-28 h-28 overflow-hidden relative m-2.5'}>
        <Image src={nowPlayingSong ? nowPlayingSong.albumImageUrl : recentlyPlayedSong?.albumImageUrl ?? ''} fill alt={''} />
      </div>
      <div className={'flex flex-col truncate text-white '}>
        <div className={'text-lg truncate'}>{nowPlayingSong ? nowPlayingSong.title : recentlyPlayedSong?.title}</div>
        <div className={'truncate'}>{nowPlayingSong ? nowPlayingSong.artist : recentlyPlayedSong?.artist}</div>
      </div>
    </Link>
  );
}
