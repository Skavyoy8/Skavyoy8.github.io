'use client'

import { useCalm } from '@/lib/calm'
import { flags, on } from '@/lib/events'
import { homelab, type RackUnitKind } from '@/content/homelab'
import { gsap, SCRAMBLE_CHARS, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'
import { rackState } from '@/lib/rackState'

const isRackUnit = (id: string | undefined): id is RackUnitKind => homelab.units.some((unit) => unit.id === id)

/**
 * Toutes les révélations pilotées par le scroll, déclarées par attributs data-* dans le HTML :
 * data-reveal="title" (lignes masquées), "fade", "stagger", "hero" (mots), data-scramble, data-count,
 * data-draw (tracé SVG), data-bars, data-rack (homelab), data-manifesto.
 */
export function Reveals() {
  const calm = useCalm()

  useGSAP(
    () => {
      if (calm) return

      // Héros : mots qui montent, puis le panneau qui glisse, après le préloader.
      const hero = document.querySelector<HTMLElement>('[data-reveal="hero"]')
      let stopHero: (() => void) | undefined
      if (hero) {
        const split = SplitText.create(hero, { type: 'words', mask: 'words', aria: 'none' })
        gsap.set(split.words, { yPercent: 115 })
        gsap.set('[data-hero-fade]', { opacity: 0, y: 20 })
        gsap.set('[data-hero-panel]', { opacity: 0, x: 90, y: 20 })
        gsap.set('[data-term-line]', { opacity: 0, x: -8 })
        const play = () => {
          gsap.to(split.words, { yPercent: 0, duration: 1.2, stagger: 0.07, delay: 0.05 })
          gsap.to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.4 })
          gsap.to('[data-hero-panel]', { opacity: 1, x: 0, y: 0, duration: 1.8, delay: 0.3 })
          // La session du terminal s'écrit ligne après ligne, une fois la carte posée.
          gsap.to('[data-term-line]', { opacity: 1, x: 0, duration: 0.6, stagger: 0.32, delay: 1.1 })
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

      // Opacité seule (pas de visibility: hidden) : le contenu reste lisible par les lecteurs d'écran avant d'apparaître.
      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]')) {
        gsap.from(el, { opacity: 0, y: 28, duration: 1.1, scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
      }

      for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]')) {
        gsap.from(el.children, {
          opacity: 0,
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

      // Barres de données qui se remplissent à l'entrée.
      for (const group of gsap.utils.toArray<HTMLElement>('[data-bars]')) {
        gsap.fromTo(
          group.querySelectorAll('[data-bar]'),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, stagger: 0.12, scrollTrigger: { trigger: group, start: 'top 85%', once: true } },
        )
      }

      // Manifeste (créé avant le lab : son pin décale tout ce qui suit) : la carte citron s'ouvre, les mots s'allument, elle se referme en logo.
      const stage = document.querySelector<HTMLElement>('[data-manifesto-stage]')
      const card = stage?.querySelector<HTMLElement>('[data-manifesto-card]')
      const logo = stage?.querySelector<HTMLElement>('[data-manifesto-logo]')
      if (stage && card && logo) {
        const words = stage.querySelectorAll('[data-manifesto-word]')
        const kicker = stage.querySelector('[data-manifesto-kicker]')
        const inset = (top: number, right: number, bottom: number, left: number, round: number) => `inset(${top}px ${right}px ${bottom}px ${left}px round ${round}px)`
        const start = () => inset(stage.offsetHeight * 0.16, stage.offsetWidth * 0.05, stage.offsetHeight * 0.16, stage.offsetWidth * 0.05, 28)
        const open = () => inset(stage.offsetHeight * 0.08, 0, stage.offsetHeight * 0.08, 0, 28)
        const close = () => {
          const s = stage.getBoundingClientRect()
          const l = logo.getBoundingClientRect()
          const ring = 9
          return inset(l.top - s.top - ring, s.right - l.right - ring, s.bottom - l.bottom - ring, l.left - s.left - ring, 30)
        }
        gsap
          // refreshPriority : ce pin est recalculé avant les déclencheurs placés plus bas dans la page.
          .timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: '+=190%', pin: true, scrub: 0.8, invalidateOnRefresh: true, refreshPriority: 1 } })
          .fromTo(card, { clipPath: start }, { clipPath: open, ease: 'power2.inOut', duration: 1 })
          .fromTo(words, { opacity: 0.12, yPercent: 30, filter: 'blur(6px)' }, { opacity: 1, yPercent: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.5 }, 0.35)
          .to([kicker, ...words], { opacity: 0, yPercent: -25, duration: 0.45, stagger: 0.015 }, '+=0.7')
          .fromTo(card, { clipPath: open }, { clipPath: close, ease: 'power3.inOut', duration: 1.2, immediateRender: false }, '<0.15')
      }

      // Homelab : le rack s'éclate, puis chaque étape allume son unité (SVG de secours et rack 3D).
      const rack = document.querySelector<HTMLElement>('[data-rack]')
      const rackSvg = rack?.querySelector<SVGSVGElement>('[data-rack-svg]')
      if (rack && rackSvg) {
        const explode = { value: 0 }
        gsap.to(explode, {
          value: 1,
          ease: 'none',
          scrollTrigger: { trigger: rack, start: 'top 70%', end: 'top 0%', scrub: 0.6 },
          onUpdate: () => {
            rackSvg.style.setProperty('--explode', String(explode.value))
            rackState.explode = explode.value
          },
        })
        const steps = gsap.utils.toArray<HTMLElement>('[data-rack-step]', rack)
        const units = gsap.utils.toArray<SVGGElement>('[data-unit]', rackSvg)
        const label = rack.querySelector<HTMLElement>('[data-rack-current]')
        const activate = (step: HTMLElement) => {
          const id = step.dataset.rackStep
          for (const s of steps) s.dataset.active = String(s === step)
          for (const unit of units) unit.dataset.active = String(unit.dataset.unit === id)
          rackState.active = isRackUnit(id) ? id : null
          if (label) label.textContent = step.querySelector('h3')?.textContent ?? ''
        }
        for (const step of steps) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 62%',
            end: 'bottom 62%',
            onToggle: (self) => {
              if (self.isActive) activate(step)
            },
          })
        }
      }

      ScrollTrigger.refresh()
      return () => {
        stopHero?.()
      }
    },
    { dependencies: [calm], revertOnUpdate: true },
  )

  return null
}
