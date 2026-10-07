import fallback from '@/content/github-fallback.json'
import { githubRepos } from '@/content/lab'

type RawRepo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  pushed_at: string
  stargazers_count: number
  fork: boolean
  has_pages: boolean
  size: number
}

export type Repo = {
  name: string
  description: string | null
  url: string
  demo: string | null
  language: string | null
  pushedAt: string
}

function normalize(raw: RawRepo[]): Repo[] {
  return raw
    .filter((r) => !r.fork && !githubRepos.exclude.includes(r.name))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, githubRepos.max)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      demo: r.homepage || (r.has_pages ? `https://${githubRepos.user.toLowerCase()}.github.io/${r.name}/` : null),
      language: r.language,
      pushedAt: r.pushed_at,
    }))
}

/**
 * Repos publics récupérés au build (Server Component). En CI, GITHUB_TOKEN évite la limite de débit.
 * Si l'API échoue, on retombe sur le JSON local : le build ne casse jamais à cause d'une API.
 */
export async function getRepos(): Promise<{ repos: Repo[]; source: 'api' | 'fallback' }> {
  const token = process.env.GITHUB_TOKEN
  try {
    const res = await fetch(`https://api.github.com/users/${githubRepos.user}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(8000),
      cache: 'force-cache',
    })
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    return { repos: normalize((await res.json()) as RawRepo[]), source: 'api' }
  } catch {
    return { repos: normalize(fallback as RawRepo[]), source: 'fallback' }
  }
}
