import type {
  Music,
  SpotifyTrack,
} from '@/features/home/schemas/spotifySchemas';

export function mapSpotifyTrack(
  track: SpotifyTrack,
  playedAt: string | null = null,
): Music | null {
  const artist = track.artists[0];
  const albumImage = track.album.images[0];

  if (!artist || !albumImage) return null;

  return {
    title: track.name,
    artist: artist.name,
    albumImageUrl: albumImage.url,
    songUrl: track.external_urls.spotify,
    playedAt,
  };
}
