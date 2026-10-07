'use client'

import { useEmailAction } from '@/components/ui/ContactActions'
import { Magnetic } from '@/components/ui/Magnetic'
import { contactCopy } from '@/content/links'

/** Gros CTA entouré d'ondes « ping » lentes, qui s'accélèrent au survol. */
export function ContactCta() {
  const openEmail = useEmailAction()
  return (
    <div className="ping relative grid place-items-center">
      <span className="ping-ring" aria-hidden="true" />
      <span className="ping-ring" aria-hidden="true" />
      <span className="ping-ring" aria-hidden="true" />
      <Magnetic strength={0.22}>
      <button
        type="button"
        onClick={openEmail}
        data-cursor="link"
        className="group relative grid size-[min(64vw,300px)] place-items-center rounded-full border border-line-strong bg-bg/40 text-center backdrop-blur-sm transition-colors duration-700 hover:border-accent hover:bg-accent hover:text-bg"
      >
        <span>
          <span className="block text-[clamp(1.75rem,4.2vw,3rem)] leading-none font-semibold tracking-[-0.05em]">{contactCopy.cta}</span>
          <span className="label mt-3 block text-muted transition-colors group-hover:text-bg/70">{contactCopy.ctaHint}</span>
        </span>
      </button>
      </Magnetic>
    </div>
  )
}
