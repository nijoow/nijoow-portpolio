import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { publicWorks } from './works/_container/worksData';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/works`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = publicWorks.map((work) => ({
    url: `${SITE_URL}/works/${work.pageName}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes];
}
