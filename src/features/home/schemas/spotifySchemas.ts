import { z } from 'zod';

const spotifyArtistSchema = z.object({
  name: z.string(),
});

const spotifyImageSchema = z.object({
  url: z.string().url(),
});

export const spotifyTrackSchema = z.object({
  name: z.string(),
  artists: z.array(spotifyArtistSchema),
  album: z.object({
    images: z.array(spotifyImageSchema),
  }),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
});

export const spotifyCurrentlyPlayingSchema = z.object({
  item: spotifyTrackSchema.nullable(),
});

export const spotifyRecentlyPlayedSchema = z.object({
  items: z.array(
    z.object({
      track: spotifyTrackSchema,
      played_at: z.string(),
    }),
  ),
});

export const musicSchema = z.object({
  title: z.string(),
  artist: z.string(),
  albumImageUrl: z.string().url(),
  songUrl: z.string().url(),
  playedAt: z.string().nullable(),
});

const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export const currentMusicResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    data: musicSchema.nullable(),
  }),
  apiErrorSchema,
]);

export const recentMusicResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    data: z.array(musicSchema),
  }),
  apiErrorSchema,
]);

export type Music = z.infer<typeof musicSchema>;
export type SpotifyTrack = z.infer<typeof spotifyTrackSchema>;
