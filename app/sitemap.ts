import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = siteConfig.projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies,
  ];
}
