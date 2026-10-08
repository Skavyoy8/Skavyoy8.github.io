import type { ReactNode } from 'react'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { EmailCta, EmailReveal } from '@/components/ui/ContactActions'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { contactCopy, cv, type SocialId, socials } from '@/content/links'
import { isTodo } from '@/content/types'
import { asset } from '@/lib/asset'

function SocialIcon({ id }: { id: SocialId }) {
  const paths: Record<SocialId, ReactNode> = {
    github: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="6" cy="15" r="2" />
        <circle cx="14" cy="7" r="2" />
        <path d="M6 7v6M14 9c0 3-8 2-8 4" />
      </>
    ),
    tryhackme: <path d="M8 2.5h4M8.5 2.5v5L4 15.5a1.4 1.4 0 0 0 1.2 2h9.6a1.4 1.4 0 0 0 1.2-2L11.5 7.5v-5M6 12.5h8" />,
    discord: (
      <>
        <path d="M4 5.5C6.5 4 13.5 4 16 5.5l1.5 8c-1.5 1.5-3.5 2-3.5 2l-1-1.5H7l-1 1.5s-2-.5-3.5-2Z" />
        <circle cx="7.8" cy="10.5" r=".9" />
        <circle cx="12.2" cy="10.5" r=".9" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="14" height="14" rx="3" />
        <path d="M7 9v5M7 6.5v.01M10 14v-5M10 11c0-1.5 3.5-2.5 3.5 0v3" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="14" height="14" rx="4" />
        <circle cx="10" cy="10" r="3.2" />
        <path d="M14 6v.01" />
      </>
    ),
    tiktok: <path d="M11 3v9.5a2.8 2.8 0 1 1-2.8-2.8M11 3c.4 2.2 1.9 3.6 4 3.8" />,
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[id]}
    </svg>
  )
}

const tileClass = 'flex h-full items-center gap-3 rounded-2xl border px-4 py-3.5'

/** Contact : un grand panneau, l'appel à m'écrire à gauche, mes profils en tuiles à droite. */
export function Contact() {
  return (
    <section id="reseaux" aria-labelledby="reseaux-title" className="container-x relative pt-28 pb-20 sm:pt-36">
      <SectionHead id="reseaux-title" index={contactCopy.index} command={contactCopy.command} title={contactCopy.title} />

      <div className="card mt-16 grid overflow-hidden lg:grid-cols-12" data-reveal>
        <span className="pointer-events-none absolute -top-40 -left-40 size-[28rem] rounded-full bg-accent/[0.07] blur-3xl" aria-hidden="true" />
        <div className="relative p-8 sm:p-12 lg:col-span-7">
          <p className="mono flex items-center gap-2.5 text-accent">
            <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {contactCopy.pong}
          </p>
          <p className="mt-6 max-w-lg text-[1.15rem] leading-relaxed text-pretty text-fg/85">{contactCopy.intro}</p>
          <EmailCta className="group mt-10 inline-flex items-center gap-4 rounded-full bg-accent py-5 pr-6 pl-8 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink shadow-[0_18px_60px_-18px_rgb(200_255_46/0.7)] transition-[transform,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#d8ff6a]">
            {contactCopy.cta}
            <span className="grid size-10 place-items-center rounded-full bg-ink text-accent">
              <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </EmailCta>
          <div className="mono mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
            <EmailReveal className="text-fg/85 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent" />
            {isTodo(cv) ? (
              <span className="flex items-center gap-2">
                {contactCopy.cvLabel} <TodoMark hint={cv.todo} />
              </span>
            ) : (
              <a href={asset(cv)} download className="text-fg/85 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent">
                {contactCopy.cvLabel}
              </a>
            )}
          </div>
        </div>

        <div className="relative border-t border-line p-8 sm:p-12 lg:col-span-5 lg:border-t-0 lg:border-l">
          <h3 className="label text-muted">{contactCopy.socialsTitle}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {socials.map((social, i) => (
              <li key={social.id} data-reveal style={delay(0.1 + i * 0.04)}>
                {isTodo(social.href) ? (
                  <div className={`${tileClass} border-dashed border-white/10`}>
                    <span className="text-muted">
                      <SocialIcon id={social.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9rem] text-fg/70">{social.label}</span>
                      <TodoMark hint={social.href.todo} />
                    </span>
                  </div>
                ) : (
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={`${tileClass} group border-line-strong bg-white/[0.02] transition-colors hover:border-accent/50`}>
                    <span className="text-accent">
                      <SocialIcon id={social.id} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9rem] font-medium text-fg/95">{social.label}</span>
                      <span className="mono block truncate text-muted">
                        <Fill value={social.handle}>{(handle) => handle}</Fill>
                      </span>
                    </span>
                    <ArrowIcon className="size-3.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
