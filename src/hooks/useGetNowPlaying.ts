import { getNowPlayingApi } from '@lib/spotify';
import { IMusic } from '@type/interface';
import React, { useEffect, useState } from 'react';

export const useGetNowPlaying = () => {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState<IMusic | null>(null);

  useEffect(() => {
    getNowPlaying();
    const intervalNowPlaying = setInterval(() => getNowPlaying(), 60000);
    return () => clearInterval(intervalNowPlaying);
  }, []);

  const getNowPlaying = async () => {
    try {
      setLoading(true);
      const data = await getNowPlayingApi();
      setSong({
        title: data.item.name,
        artist: data.item.artists[0].name,
        albumImageUrl: data.item.album.images[0].url,
        songUrl: data.item.external_urls.spotify,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return { loading, song };
};
