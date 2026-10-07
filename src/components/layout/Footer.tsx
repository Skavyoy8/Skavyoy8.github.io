import Link from 'next/link'
import { ArrowIcon, Wordmark } from '@/components/ui/Primitives'
import { footer, site } from '@/content/site'

// Date injectée par next.config.ts au moment du build.
const built = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? '2026-10-07T00:00:00Z')

const linkClass = 'transition-colors hover:text-fg'

export function Footer() {
  return (
    <footer className="relative z-10">
      <div className="container-x">
        <div className="flex flex-col gap-8 border-t border-line py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-sm text-[0.9rem] text-pretty text-muted">{footer.tagline}</p>
          </div>
          <ul className="mono flex flex-wrap gap-x-6 gap-y-2 text-muted">
            <li>
              <a href={site.github.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
            <li>
              <a href={site.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {footer.source}
              </a>
            </li>
            <li>
              <Link href="/link/" className={linkClass}>
                {footer.linkPage}
              </Link>
            </li>
            <li>
              <a href="#contenu" className={`group inline-flex items-center gap-1.5 ${linkClass}`}>
                {footer.backToTop}
                <ArrowIcon direction="up" className="size-3.5" />
              </a>
            </li>
          </ul>
        </div>
        <p className="mono flex flex-wrap justify-between gap-2 border-t border-line py-6 text-muted">
          <span>
            © {built.getFullYear()} {site.name} · {site.location}
          </span>
          <span>{footer.rights}</span>
        </p>
      </div>
    </footer>
  )
}
