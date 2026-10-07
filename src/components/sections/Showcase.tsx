import { ContactCta } from '@/components/sections/ContactCta'
import { CopyButton, EmailReveal } from '@/components/ui/ContactActions'
import { HoloCard } from '@/components/ui/HoloCard'
import { ArrowIcon, SectionHeader } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { contactCopy, cv, email, socials } from '@/content/links'
import { badgesCopy, roomsCopy, tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'
import { asset } from '@/lib/asset'
import { RoomsExplorer } from './Rooms'

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="relative py-[16vh]">
      <SectionHeader id="rooms-title" index={roomsCopy.index} title={roomsCopy.title} intro={roomsCopy.intro} />
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
    <section id="badges" aria-labelledby="badges-title" className="relative py-[16vh]">
      <SectionHeader id="badges-title" index={badgesCopy.index} title={badgesCopy.title} intro={badgesCopy.intro} />
      <div className="container-x">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {slots.map((badge, i) => (
            <li key={badge?.name ?? `slot-${i}`}>
              <HoloCard className="flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl border border-line-strong bg-surface p-6">
                <div className="label flex justify-between text-muted">
                  <span>THM</span>
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
            <span className="flex items-center gap-3 text-sm text-muted">
              {badgesCopy.link} <TodoMark hint={tryhackme.profileUrl.todo} />
            </span>
          ) : (
            <a href={tryhackme.profileUrl} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 hover:text-accent">
              {badgesCopy.link} <ArrowIcon className="size-3.5" />
            </a>
          )}
        </p>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="reseaux" aria-labelledby="contact-title" className="relative pt-[16vh] pb-[12vh]">
      <SectionHeader id="contact-title" index={contactCopy.index} title={contactCopy.title} intro={contactCopy.intro} />
      <div className="flex min-h-[64svh] items-center justify-center">
        <ContactCta />
      </div>
      <div className="container-x grid grid-cols-4 gap-x-(--gutter) gap-y-10 lg:grid-cols-12">
        <ul className="col-span-4 divide-y divide-line border-y border-line lg:col-span-8">
          {socials.map((link) => (
            <li key={link.id} className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-tight">{link.label}</span>
                <span className="font-mono text-sm text-muted">
                  <Fill value={link.handle}>{(handle) => handle}</Fill>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {link.copy && !isTodo(link.handle) ? (
                  <CopyButton text={link.handle} label={contactCopy.copyHandle} className="label rounded-full border border-line-strong px-3 py-1.5 hover:border-fg" />
                ) : null}
                {isTodo(link.href) ? (
                  <TodoMark hint={link.href.todo} />
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:bg-accent hover:text-bg"
                    aria-label={`${link.label} (nouvel onglet)`}
                  >
                    <ArrowIcon className="size-4" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="col-span-4 space-y-8 lg:col-span-3 lg:col-start-10">
          <div>
            <p className="label text-muted">{contactCopy.emailLabel}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <EmailReveal className="label rounded-full border border-line-strong px-4 py-2 hover:border-fg" />
              {isTodo(email) ? <TodoMark hint={email.todo} /> : null}
            </div>
          </div>
          <div>
            <p className="label text-muted">CV</p>
            <div className="mt-3">
              <Fill value={cv}>
                {(file) => (
                  <a href={asset(file)} download className="label inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-bg hover:bg-accent">
                    {contactCopy.cvLabel} <ArrowIcon direction="down" className="size-3.5" />
                  </a>
                )}
              </Fill>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
