import Link from 'next/link'
import { ArrowIcon } from '@/components/ui/Primitives'
import { footer, site } from '@/content/site'

// Date injectée par next.config.ts au moment du build.
const built = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? '2026-10-07T00:00:00Z')

const linkClass = 'transition-colors hover:text-fg'

export function Footer() {
  return (
    <footer className="relative z-10">
      <div className="container-x">
        <div className="flex flex-col gap-8 border-t border-line py-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-[0.95rem] text-pretty text-fg/75">{footer.tagline}</p>
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
        {/* Le pseudo géant qui ferme la page, en filigrane (dessin SVG décoratif, pas du texte à lire). */}
        <svg viewBox="0 0 1120 200" className="mt-2 block w-full select-none" aria-hidden="true">
          <defs>
            <linearGradient id="footer-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.15" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#8e8e98" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <text x="-6" y="178" fontSize="236" fontWeight="600" letterSpacing="-15" fill="url(#footer-metal)">
            skavyoy
            <tspan className="caret" fill="#c8ff2e" fillOpacity="0.5">
              _
            </tspan>
          </text>
        </svg>
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
