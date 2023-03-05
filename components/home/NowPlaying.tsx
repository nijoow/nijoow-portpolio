import { useGetNowPlaying } from "hooks/useGetNowPlaying";
import { useGetRecentlyPlayed } from "hooks/useGetRecentlyPlayed";
import React from "react";
import styles from "../../styles/home/Home.module.css";

export default function NowPlaying() {
  const { loading: nowPlayingLoading, song: nowPlayingSong } =
    useGetNowPlaying();
  const { loading: recentlyPlayedLoading, song: recentlyPlayedSong } =
    useGetRecentlyPlayed();

  return (
    <a
      href={
        nowPlayingSong ? nowPlayingSong.songUrl : recentlyPlayedSong?.songUrl
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.song}>
        <div className={styles.songAlbumImage}>
          <img
            src={
              nowPlayingSong
                ? nowPlayingSong.albumImageUrl
                : recentlyPlayedSong?.albumImageUrl
            }
            width="130"
            height="130"
          ></img>
        </div>
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>
            {nowPlayingSong ? nowPlayingSong.title : recentlyPlayedSong?.title}
          </div>
          <div className={styles.songArtist}>
            {nowPlayingSong
              ? nowPlayingSong.artist
              : recentlyPlayedSong?.artist}
          </div>
        </div>
      </div>
    </a>
  );
}
