import { z } from 'zod';

export const githubRepositoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    html_url: z.string().url(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    pushed_at: z.string(),
    fork: z.boolean(),
    topics: z.array(z.string()).default([]),
  }),
);

export const githubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  language: z.string().nullable(),
  stars: z.number(),
  pushedAt: z.string(),
  topics: z.array(z.string()),
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
    data: z.array(githubRepositorySchema),
  }),
  apiErrorSchema,
]);

export type GithubRepository = z.infer<typeof githubRepositorySchema>;
