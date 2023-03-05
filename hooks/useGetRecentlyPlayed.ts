import { getRecentlyPlayedApi } from "lib/spotify";
import React, { useEffect, useState } from "react";
import { MusicType } from "types/type";

export const useGetRecentlyPlayed = () => {
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState<MusicType | null>(null);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const getRecentlyPlayed = async () => {
    try {
      setLoading(true);
      const data = await getRecentlyPlayedApi();
      setSong({
        title: data.items[0].track.name,
        artist: data.items[0].track.artists[0].name,
        albumImageUrl: data.items[0].track.album.images[0].url,
        songUrl: data.items[0].track.external_urls.spotify,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, song };
};
