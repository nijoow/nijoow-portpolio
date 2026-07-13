import { z } from 'zod';

export const githubEventsSchema = z.array(
  z.object({
    type: z.string(),
    repo: z.object({
      name: z.string(),
    }),
    created_at: z.string(),
    payload: z.object({
      commits: z
        .array(
          z.object({
            sha: z.string(),
            message: z.string(),
          }),
        )
        .optional(),
    }),
  }),
);

export const githubCommitSchema = z.object({
  sha: z.string(),
  message: z.string(),
  repository: z.string(),
  committedAt: z.string(),
  url: z.string().url(),
});

const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export const githubActivityResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    data: z.array(githubCommitSchema),
  }),
  apiErrorSchema,
]);

export type GithubCommit = z.infer<typeof githubCommitSchema>;
