import { z } from 'zod';

export const githubRepositoriesSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    html_url: z.url(),
    description: z.string().nullable(),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    pushed_at: z.iso.datetime(),
    fork: z.boolean(),
    topics: z.array(z.string()).default([]),
  }),
);

const githubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  url: z.url(),
  language: z.string().nullable(),
  stars: z.number(),
  pushedAt: z.iso.datetime(),
  topics: z.array(z.string()),
});

export const githubRepositoryListSchema = z.array(githubRepositorySchema);

export type GithubRepository = z.infer<typeof githubRepositorySchema>;
