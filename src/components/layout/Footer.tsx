import { footer, site } from '@/content/site'
import { ArrowIcon } from '@/components/ui/Primitives'
import { ParisTime } from '@/components/ui/Live'

// Date injectée par next.config.ts au moment du build.
const built = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? '2026-10-07T00:00:00Z')
const buildDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' }).format(built)

/** Footer « révélé » : il reste fixe, la page se soulève au-dessus. */
export function Footer() {
  return (
    <div className="footer-reveal z-20 bg-bg">
      <footer className="fixed bottom-0 flex h-(--footer-h) w-full flex-col justify-between bg-surface pt-24 pb-6">
        <div className="container-x grid grid-cols-4 gap-x-(--gutter) gap-y-8 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-3">
            <p className="label text-muted">{footer.timeLabel}</p>
            <p className="mt-2 font-mono text-sm">
              <ParisTime />
            </p>
          </div>
          <div className="col-span-2 lg:col-span-3">
            <p className="label text-muted">{footer.buildLabel}</p>
            <p className="mt-2 font-mono text-sm">{buildDate}</p>
          </div>
          <div className="col-span-4 lg:col-span-3">
            <p className="label text-muted">Stack</p>
            <p className="mt-2 font-mono text-sm">{footer.builtWith}</p>
          </div>
          <div className="col-span-4 flex items-start lg:col-span-3 lg:justify-end">
            <a href="#accueil" className="group label inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 hover:border-fg">
              {footer.backToTop}
              <ArrowIcon direction="up" className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="container-x">
          <p className="text-[clamp(4.5rem,21vw,26rem)] leading-[0.78] font-semibold tracking-[-0.075em] select-none" aria-hidden="true">
            {site.name.toUpperCase()}
            <span className="text-accent">.</span>
          </p>
          <p className="label mt-6 flex flex-wrap justify-between gap-2 text-muted">
            <span>© {built.getFullYear()} {site.name} · {site.location}</span>
            <span>{footer.rights}</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
