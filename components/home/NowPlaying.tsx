import React, { useEffect, useState } from "react";
import styles from "../../styles/home/Home.module.css";
import querystring from "querystring";
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export default function NowPlaying() {
  const [recentlyPlayed, setRecentlyPlayedMusic] = useState({
    title: undefined,
    artist: undefined,
    albumImageUrl: undefined,
    songUrl: undefined,
  });
  const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((song) => {
        setRecentlyPlayedMusic({
          title: song.item.name,
          artist: song.item.artists[0].name,
          albumImageUrl: song.item.album.images[0].url,
          songUrl: song.item.external_urls.spotify,
        });
      })
      .catch((e) => {
        getRecentlyPlayed();
      });
  };
  const getRecentlyPlayed = async () => {
    const { access_token } = await getAccessToken();

    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((song) => {
        setRecentlyPlayedMusic({
          title: song.items[0].track.name,
          artist: song.items[0].track.artists[0].name,
          albumImageUrl: song.items[0].track.album.images[0].url,
          songUrl: song.items[0].track.external_urls.spotify,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getNowPlaying();
    setInterval(() => getNowPlaying(), 60000);
  }, []);

  return (
    <a href={recentlyPlayed.songUrl} target="_blank" rel="noopener noreferrer">
      <div className={styles.song}>
        <div className={styles.songAlbumImage}>
          <img
            src={recentlyPlayed.albumImageUrl}
            width="130"
            height="130"
          ></img>
        </div>
        <div className={styles.songInfo}>
          <div className={styles.songTitle}>{recentlyPlayed.title}</div>
          <div className={styles.songArtist}>{recentlyPlayed.artist}</div>
        </div>
      </div>
    </a>
  );
}
