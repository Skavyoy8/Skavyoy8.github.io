import { CopyButton, EmailReveal } from '@/components/ui/ContactActions'
import { HoloCard } from '@/components/ui/HoloCard'
import { AccentTitle, ArrowIcon, CardBar, LogoMark, SectionHead } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { contactCopy, cv, email, socials } from '@/content/links'
import { badgesCopy, roomsCopy, tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'
import { RoomsExplorer } from './Rooms'

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="frost relative py-[16vh]">
      <SectionHead id="rooms-title" pill={roomsCopy.pill} title={roomsCopy.title} intro={roomsCopy.intro} />
      <RoomsExplorer />
    </section>
  )
}

/** Glyphe de badge dessiné en SVG (pas d'image TryHackMe). */
function BadgeGlyph({ seed }: { seed: number }) {
  const rings = 3 + (seed % 3)
  return (
    <svg viewBox="0 0 120 120" className="size-28" aria-hidden="true">
      <polygon points="60,6 107,33 107,87 60,114 13,87 13,33" fill="none" stroke="rgb(255 255 255 / .28)" />
      {Array.from({ length: rings }, (_, i) => (
        <circle key={i} cx="60" cy="60" r={14 + i * 9} fill="none" stroke={i === 0 ? '#c8ff2e' : 'rgb(106 228 255 / .35)'} strokeDasharray={i % 2 ? '2 5' : undefined} />
      ))}
      <path d="M30 60 Q40 40 50 60 T70 60 T90 60" fill="none" stroke="#ededef" strokeWidth="1.5" />
    </svg>
  )
}

export function Badges() {
  const badges = tryhackme.badges
  const slots = badges.length ? badges : Array.from({ length: 4 }, () => null)
  return (
    <section id="badges" aria-labelledby="badges-title" className="frost relative py-[16vh]">
      <SectionHead id="badges-title" pill={badgesCopy.pill} title={badgesCopy.title} intro={badgesCopy.intro} />
      <div className="container-x mt-14">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {slots.map((badge, i) => (
            <li key={badge?.name ?? `slot-${i}`}>
              <HoloCard className="glass flex aspect-[3/4] flex-col justify-between overflow-hidden p-6">
                <div className="mono flex justify-between text-muted">
                  <span>thm</span>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex justify-center">
                  <BadgeGlyph seed={i} />
                </div>
                <div>
                  {badge ? (
                    <>
                      <p className="text-xl font-semibold tracking-tight">{badge.name}</p>
                      <p className="mt-1 text-sm text-muted">{badge.description}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-semibold tracking-tight text-fg/70">{badgesCopy.slot}</p>
                      <p className="mt-2">
                        <TodoMark hint={tryhackme.badgesTodo.todo} />
                      </p>
                    </>
                  )}
                </div>
              </HoloCard>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          {isTodo(tryhackme.profileUrl) ? (
            <span className="mono flex items-center gap-3 text-muted">
              {badgesCopy.link} <TodoMark hint={tryhackme.profileUrl.todo} />
            </span>
          ) : (
            <a href={tryhackme.profileUrl} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-2 text-fg/85 hover:text-accent">
              {badgesCopy.link} <ArrowIcon className="size-3.5" />
            </a>
          )}
        </p>
      </div>
    </section>
  )
}

export function Contact() {
  const card = contactCopy.card
  return (
    <section id="reseaux" aria-labelledby="contact-title" className="relative pt-[16vh] pb-[10vh]">
      <SectionHead id="contact-title" pill={contactCopy.pill} title={contactCopy.title} intro={contactCopy.intro} />

      <div className="container-x mt-14 grid gap-5 lg:grid-cols-12">
        <article className="glass glass-blur relative flex min-h-80 flex-col overflow-hidden p-7 lg:col-span-5">
          <p className="flex items-center gap-2.5 text-[15px] font-medium">
            <LogoMark /> {site.name}
          </p>
          <svg viewBox="0 0 120 120" className="pointer-events-none absolute -top-4 -right-6 size-56 text-white/[0.05]" aria-hidden="true">
            <path d="M14 78h22V42h24v36h24V42h22" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-auto max-w-xs pt-16 text-[1.05rem] text-pretty text-fg/85">{contactCopy.identity}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
            <span className="mono text-muted">{contactCopy.follow}</span>
            <ul className="flex flex-wrap gap-2">
              {socials.map((link) => (
                <li key={link.id}>
                  {isTodo(link.href) ? (
                    <span className="tile size-9 rounded-lg text-[11px] opacity-40" title={`${link.label} : ${link.href.todo}`}>
                      {link.short}
                    </span>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="tile size-9 rounded-lg text-[11px] transition-colors hover:border-accent/50 hover:text-accent" aria-label={`${link.label} (nouvel onglet)`}>
                      {link.short}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="on-lime dots-ink relative flex flex-col overflow-hidden rounded-[1.25rem] bg-accent p-7 text-ink sm:p-9 lg:col-span-7">
          <p className="mono text-ink/65">{card.kicker}</p>
          <h3 className="mt-4 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            <AccentTitle title={card.title} />
          </h3>
          <p className="mt-4 max-w-xl text-pretty text-ink/75">{card.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]">
            <span className="flex-1 text-[15px] text-ink/70">{card.field}</span>
            <EmailReveal className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black" />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {isTodo(email) ? <TodoMark hint={email.todo} /> : null}
            <Fill value={cv}>
              {(file) => (
                <a href={asset(file)} download className="mono inline-flex items-center gap-2 text-ink underline-offset-4 hover:underline">
                  {contactCopy.cvLabel} <ArrowIcon direction="down" className="size-3.5" />
                </a>
              )}
            </Fill>
          </div>
        </article>

        <article className="glass p-6 sm:p-7 lg:col-span-12">
          <CardBar title={contactCopy.socialsTitle.toLowerCase()} />
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((link) => (
              <li key={link.id} className="flex items-center justify-between gap-4 border-b border-white/[0.06] py-4">
                <div className="min-w-0">
                  <p className="text-[15px]">{link.label}</p>
                  <p className="mono truncate text-muted">
                    <Fill value={link.handle}>{(handle) => handle}</Fill>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {link.copy && !isTodo(link.handle) ? (
                    <CopyButton text={link.handle} label={contactCopy.copyHandle} className="mono rounded-full border border-white/10 px-3 py-1.5 hover:bg-white/5" />
                  ) : null}
                  {isTodo(link.href) ? (
                    <TodoMark hint={link.href.todo} />
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-9 place-items-center rounded-full border border-white/10 transition-colors hover:border-accent hover:bg-accent hover:text-ink"
                      aria-label={`${link.label} (nouvel onglet)`}
                    >
                      <ArrowIcon className="size-3.5" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
