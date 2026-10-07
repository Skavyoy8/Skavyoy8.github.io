'use client'

import { useRef } from 'react'
import { LogoMark } from '@/components/ui/Primitives'
import { preloader } from '@/content/site'
import { emit } from '@/lib/events'
import { gsap, useGSAP } from '@/lib/gsap'

const BOOT = preloader.boot

/**
 * Compteur 000 → 100 branché sur le vrai chargement (polices du site),
 * lignes de boot, puis rideau. < 2,5 s, passable, une fois par session.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const html = document.documentElement
      const el = root.current
      if (!el || html.dataset.booted === 'true' || html.dataset.calm === 'true' || getComputedStyle(el).display === 'none') {
        emit('preloader:done')
        return
      }
      try {
        sessionStorage.setItem('skavyoy:booted', '1')
      } catch {
        // pas de stockage : le préloader rejouera, ce n'est pas grave
      }

      let target = 12
      let shown = 0
      let finished = false
      const start = performance.now()
      // Progression réelle : les polices (la 3D arrive après, en fondu, quand la page est affichée).
      let fontsReady = false
      document.fonts?.ready.then(() => {
        fontsReady = true
      })

      const finish = (fast: boolean) => {
        if (finished) return
        finished = true
        gsap.ticker.remove(tick)
        const tl = gsap.timeline({
          onComplete: () => {
            el.style.display = 'none'
            html.dataset.booted = 'true'
            emit('preloader:done')
          },
        })
        if (!fast) tl.to('[data-boot-line]', { autoAlpha: 1, duration: 0.18, stagger: 0.07, ease: 'none' })
        tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: fast ? 0.45 : 0.75, ease: 'signal' }, fast ? 0 : '+=0.12')
      }

      const tick = () => {
        const elapsed = performance.now() - start
        const loaded = fontsReady ? 100 : 0
        target = Math.max(target, Math.min(loaded, 12 + elapsed / 14))
        if ((loaded === 100 && elapsed > 700) || elapsed > 1200) target = 100
        shown += (target - shown) * 0.14
        if (target - shown < 0.6) shown = target
        if (count.current) count.current.textContent = String(Math.floor(shown)).padStart(3, '0')
        if (shown >= 100) finish(false)
      }
      gsap.ticker.add(tick)

      const skip = () => finish(true)
      window.addEventListener('keydown', skip, { once: true })
      el.addEventListener('click', skip, { once: true })
      return () => {
        gsap.ticker.remove(tick)
        window.removeEventListener('keydown', skip)
      }
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex-col justify-between bg-bg p-(--gutter) text-fg"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
      aria-hidden="true"
     
    >
      <div className="mono flex items-center justify-between pt-3 text-muted">
        <span className="flex items-center gap-2.5 text-fg">
          <LogoMark /> {preloader.brand}
        </span>
        <span>{preloader.skip}</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <ul className="mono space-y-1 text-muted">
          {BOOT.map((line) => (
            <li key={line} data-boot-line style={{ opacity: 0, visibility: 'hidden' }}>
              {line}
            </li>
          ))}
        </ul>
        <span ref={count} className="font-mono text-[clamp(5rem,18vw,15rem)] leading-none tracking-tighter text-accent tabular-nums">
          000
        </span>
      </div>
    </div>
  )
}
