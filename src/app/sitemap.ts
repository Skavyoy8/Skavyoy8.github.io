import type { MetadataRoute } from 'next'
import { projects } from '@/content/lab'
import { site } from '@/content/site'
import { basePath } from '@/lib/asset'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const root = `${site.url}${basePath}`
  const lastModified = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now())
  return [
    { url: `${root}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...projects.filter((p) => p.detail).map((p) => ({ url: `${root}/lab/${p.slug}/`, lastModified, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${root}/link/`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
  ]
}
