import { z } from 'zod';

const spotifyArtistSchema = z.object({
  name: z.string(),
});

const spotifyImageSchema = z.object({
  url: z.url(),
});

const spotifyTrackSchema = z.object({
  name: z.string(),
  artists: z.array(spotifyArtistSchema),
  album: z.object({
    images: z.array(spotifyImageSchema),
  }),
  external_urls: z.object({
    spotify: z.url(),
  }),
});

export const spotifyCurrentlyPlayingSchema = z.object({
  item: spotifyTrackSchema.nullable(),
  is_playing: z.boolean(),
});

export const spotifyRecentlyPlayedSchema = z.object({
  items: z.array(
    z.object({
      track: spotifyTrackSchema,
      played_at: z.iso.datetime(),
    }),
  ),
});

const musicSchema = z.object({
  title: z.string(),
  artist: z.string(),
  albumImageUrl: z.url(),
  songUrl: z.url(),
  playedAt: z.iso.datetime().nullable(),
});

export const musicActivitySchema = z.object({
  current: musicSchema.nullable(),
  recent: z.array(musicSchema),
  isPlaying: z.boolean(),
});

export type Music = z.infer<typeof musicSchema>;
export type MusicActivity = z.infer<typeof musicActivitySchema>;
export type SpotifyTrack = z.infer<typeof spotifyTrackSchema>;
