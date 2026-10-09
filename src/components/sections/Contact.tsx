import type { ReactNode } from 'react'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { CopyButton } from '@/components/ui/ContactActions'
import { contactCopy, discord, type SocialId, socials } from '@/content/links'

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
    instagram: (
      <>
        <rect x="3" y="3" width="14" height="14" rx="4" />
        <circle cx="10" cy="10" r="3.2" />
        <path d="M14 6v.01" />
      </>
    ),
    tiktok: <path d="M11 3v9.5a2.8 2.8 0 1 1-2.8-2.8M11 3c.4 2.2 1.9 3.6 4 3.8" />,
    steam: (
      <>
        <circle cx="10" cy="10" r="7.5" />
        <circle cx="12.6" cy="8" r="2" />
        <circle cx="7.4" cy="12.6" r="1.6" />
        <path d="m8.8 11.9 2.2-2.6" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[id]}
    </svg>
  )
}

const tileClass = 'group flex h-full w-full items-center gap-3 rounded-2xl border border-line-strong bg-white/[0.02] px-4 py-3.5 text-left transition-colors hover:border-accent/50'

function TileBody({ id, label, handle, external }: { id: SocialId; label: string; handle: string; external: boolean }) {
  return (
    <>
      <span className="text-accent">
        <SocialIcon id={id} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9rem] font-medium text-fg/95">{label}</span>
        <span className="mono block break-words text-muted">{handle}</span>
      </span>
      <ArrowIcon className={`size-3.5 shrink-0 text-muted transition-colors group-hover:text-accent ${external ? '' : 'rotate-90'}`} />
    </>
  )
}

/** Contact : un grand panneau, l'appel à m'écrire sur Discord à gauche, mes profils en tuiles à droite. */
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
          <CopyButton
            text={discord}
            label={`${contactCopy.cta} : ${contactCopy.ctaHint(discord)}`}
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-accent py-4 pr-4 pl-6 text-[1.05rem] font-semibold whitespace-nowrap sm:py-5 sm:pr-6 sm:pl-8 sm:text-[1.25rem] tracking-[-0.02em] text-ink shadow-[0_18px_60px_-18px_rgb(200_255_46/0.7)] transition-[transform,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#d8ff6a]"
          >
            {contactCopy.cta}
            <span className="grid size-10 place-items-center rounded-full bg-ink text-accent">
              <SocialIcon id="discord" />
            </span>
          </CopyButton>
          <p className="mono mt-5 text-muted">{contactCopy.ctaHint(discord)}</p>
        </div>

        <div className="relative border-t border-line p-8 sm:p-12 lg:col-span-5 lg:border-t-0 lg:border-l">
          <h3 className="label text-muted">{contactCopy.socialsTitle}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {socials.map((social, i) => (
              <li key={social.id} data-reveal style={delay(0.1 + i * 0.04)}>
                {social.href ? (
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={tileClass}>
                    <TileBody id={social.id} label={social.label} handle={social.handle} external />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                ) : (
                  <CopyButton text={social.handle} label={`${contactCopy.copyHandle} ${social.label} : ${social.handle}`} className={tileClass}>
                    <TileBody id={social.id} label={social.label} handle={social.handle} external={false} />
                  </CopyButton>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
