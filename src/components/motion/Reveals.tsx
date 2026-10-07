'use client'

import { useCalm } from '@/lib/calm'
import { flags, on } from '@/lib/events'
import { gsap, SCRAMBLE_CHARS, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

/**
 * Toutes les révélations pilotées par le scroll, déclarées par attributs data-* dans le HTML :
 * data-reveal="title" (lignes masquées), "fade", "hero" (lettres), data-scramble, data-count,
 * data-draw (tracé SVG), data-hscroll (piliers en scroll horizontal pinné, desktop).
 */
export function Reveals() {
  const calm = useCalm()

  useGSAP(
    () => {
      if (calm) return

      // Héros : lettres qui montent, après le préloader.
      const hero = document.querySelector<HTMLElement>('[data-reveal="hero"]')
      let stopHero: (() => void) | undefined
      if (hero) {
        const split = SplitText.create(hero, { type: 'chars', mask: 'chars', aria: 'none' })
        gsap.set(split.chars, { yPercent: 115 })
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 20 })
        const play = () => {
          gsap.to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.045, delay: 0.05 })
          gsap.to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.45 })
        }
        if (flags.preloaderDone) play()
        else stopHero = on('preloader:done', play)
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal="title"]')) {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          // Découpe en lignes : le texte reste lisible tel quel, pas d'aria-label (interdit sur p/span).
          aria: 'none',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        })
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]')) {
        gsap.from(el, { autoAlpha: 0, y: 28, duration: 1.1, scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]')) {
        gsap.from(el.children, {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-scramble]')) {
        const text = el.textContent ?? ''
        gsap.to(el, {
          duration: 1.1,
          scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.5, revealDelay: 0.15 },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-count]')) {
        const end = Number(el.dataset.count)
        if (!Number.isFinite(end)) continue
        const counter = { value: 0 }
        gsap.to(counter, {
          value: end,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value))
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      }

      for (const path of gsap.utils.toArray<SVGPathElement>('[data-draw]')) {
        const length = path.getTotalLength()
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: path.closest('[data-draw-scope]') ?? path, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
          },
        )
      }

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const section = document.querySelector<HTMLElement>('[data-hscroll]')
        const track = section?.querySelector<HTMLElement>('[data-hscroll-track]')
        if (!section || !track) return
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 10,
          },
        })
      })

      ScrollTrigger.refresh()
      return () => {
        stopHero?.()
        mm.revert()
      }
    },
    { dependencies: [calm], revertOnUpdate: true },
  )

  return null
}
