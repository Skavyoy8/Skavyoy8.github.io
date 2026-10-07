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

const rowClass = 'card flex items-center gap-4 rounded-2xl px-5 py-4'

export function Contact() {
  return (
    <section id="reseaux" aria-labelledby="reseaux-title" className="container-x relative pt-28 pb-20 sm:pt-36">
      <SectionHead id="reseaux-title" index={contactCopy.index} title={contactCopy.title} />

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5" data-reveal>
          <p className="text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-[-0.04em] text-accent">{contactCopy.handle}</p>
          <p className="mt-4 max-w-xs text-pretty text-muted">{contactCopy.intro}</p>
          <div className="relative mt-12 hidden size-40 lg:block" aria-hidden="true">
            <span className="orbit inset-0" />
            <span className="orbit inset-[22%] border-accent/30" />
            <span className="orbit -inset-x-[30%] inset-y-[30%] rotate-[-24deg]" />
            <span className="pulse-dot absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-accent shadow-[0_0_14px_#c8ff2e]" />
          </div>
        </div>

        <ul className="grid gap-3 lg:col-span-7">
          {socials.map((social, i) => (
            <li key={social.id} data-reveal style={delay(i * 0.05)}>
              {isTodo(social.href) ? (
                <div className={rowClass}>
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted">
                    <SocialIcon id={social.id} />
                  </span>
                  <span className="flex-1 font-medium text-fg/70">{social.label}</span>
                  <TodoMark hint={social.href.todo} />
                </div>
              ) : (
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={`${rowClass} group transition-colors hover:border-white/15 hover:bg-white/[0.035]`}>
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent">
                    <SocialIcon id={social.id} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-fg/95">{social.label}</span>
                    <span className="mono block text-muted">
                      <Fill value={social.handle}>{(handle) => handle}</Fill>
                    </span>
                  </span>
                  <ArrowIcon className="size-4 text-muted transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-28 border-t border-line pt-14" data-reveal>
        <p className="label text-muted">{contactCopy.kicker}</p>
        <EmailCta className="group mt-5 inline-flex items-center gap-[0.25em] text-left text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.06em] transition-colors hover:text-accent">
          {contactCopy.cta}
          <ArrowIcon className="size-[0.55em] text-accent transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </EmailCta>
        <div className="mono mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
          <span>{contactCopy.ctaNote}</span>
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
    </section>
  )
}
