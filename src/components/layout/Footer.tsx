import Link from 'next/link'
import { ParisTime } from '@/components/ui/Live'
import { LogoMark } from '@/components/ui/Primitives'
import { projects } from '@/content/lab'
import { contactCopy, socials } from '@/content/links'
import { sections } from '@/content/nav'
import { footer, site } from '@/content/site'
import { isTodo } from '@/content/types'

// Date injectée par next.config.ts au moment du build.
const built = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? '2026-10-07T00:00:00Z')
const buildDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' }).format(built)

const linkClass = 'text-[14px] text-fg/70 transition-colors hover:text-fg'

export function Footer() {
  const [seeking, school, place] = contactCopy.status
  return (
    <footer className="relative z-10 bg-[#050506]/90 pt-10 pb-8">
      <div className="container-x">
        <ul className="mono flex flex-col justify-between gap-3 border-b border-white/[0.06] pb-6 text-muted sm:flex-row">
          <li className="flex items-center gap-2">
            <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" /> {seeking}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> {school}
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> {place} · <ParisTime />
          </li>
        </ul>

        <div className="grid gap-10 py-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-2.5 text-[15px] font-medium">
              <LogoMark /> {site.name}
            </p>
            <p className="mt-4 max-w-sm text-pretty text-fg/75">{footer.tagline}</p>
            <p className="mono mt-6 text-muted">{footer.stack}</p>
          </div>
          <nav aria-label="Pied de page" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            <div>
              <p className="mono text-muted">{footer.columns.sections}</p>
              <ul className="mt-4 space-y-2.5">
                {sections.slice(1).map((section) => (
                  <li key={section.id}>
                    <a href={`/#${section.id}`} className={linkClass}>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono text-muted">{footer.columns.projects}</p>
              <ul className="mt-4 space-y-2.5">
                {projects
                  .filter((p) => p.detail)
                  .map((project) => (
                    <li key={project.slug}>
                      <Link href={`/lab/${project.slug}/`} className={linkClass}>
                        {project.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="mono text-muted">{footer.columns.links}</p>
              <ul className="mt-4 space-y-2.5">
                {socials
                  .filter((s) => !isTodo(s.href))
                  .map((social) => (
                    <li key={social.id}>
                      <a href={isTodo(social.href) ? undefined : social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {social.label}
                      </a>
                    </li>
                  ))}
                <li>
                  <Link href="/link/" className={linkClass}>
                    {footer.linkPage}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mono text-muted">{footer.columns.site}</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-fg/70">
                <li>
                  {footer.buildLabel} : {buildDate}
                </li>
                <li>
                  <a href={site.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {footer.source}
                  </a>
                </li>
                <li>
                  <a href="#accueil" className={linkClass}>
                    {footer.backToTop}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <p className="mono flex flex-wrap justify-between gap-2 border-t border-white/[0.06] pt-6 text-muted">
          <span>
            © {built.getFullYear()} {site.name}, {site.location}
          </span>
          <span>{footer.rights.toLowerCase()}</span>
        </p>
      </div>
    </footer>
  )
}
