'use client'

import { useEffect, useRef } from 'react'
import { calmStore } from '@/lib/calm'

/**
 * Fond animé en canvas 2D : des étoiles qui scintillent et deux rubans de fils fins
 * qui ondulent et se tordent lentement. Ni lib ni WebGL : quelques milliers de points
 * par image, donc fluide même sur un petit portable.
 * L'image est dessinée tout de suite, mais elle ne s'anime qu'au premier geste du visiteur
 * (scroll, souris, toucher, clavier) : le chargement de la page reste léger.
 * Mode calme : une seule image figée. Onglet caché : l'animation s'arrête.
 */

const WAKE_EVENTS = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const

type Ribbon = {
  /** Hauteur du ruban à gauche, puis pente vers la droite (en fraction de l'écran). */
  y0: number
  slope: number
  amp: number
  freq: number
  speed: number
  spread: number
  twist: number
  phase: number
  alpha: number
}

type Star = { x: number; y: number; size: number; alpha: number; speed: number; phase: number; depth: number }

const BG = '#050506'

const RIBBONS: readonly Ribbon[] = [
  // Le grand ruban : il traverse le héros en diagonale, du bas à gauche vers le haut à droite.
  { y0: 0.86, slope: -0.62, amp: 0.08, freq: 2.0, speed: 0.11, spread: 0.16, twist: 1.3, phase: 0, alpha: 1 },
  // Un second, plus discret, qui croise le premier.
  { y0: 0.3, slope: 0.46, amp: 0.05, freq: 2.8, speed: -0.08, spread: 0.08, twist: 1.9, phase: 2.1, alpha: 0.55 },
]

export function Ambient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let lines = 0
    let xs = new Float32Array(0)
    let us = new Float32Array(0)
    let base = new Float32Array(0)
    let spread = new Float32Array(0)
    let phi = new Float32Array(0)
    let stars: Star[] = []
    let gradients: CanvasGradient[] = []
    let raf = 0
    let last = 0
    let slow = 16
    let frame = 0
    let small = false
    let awake = false

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      small = width < 700
      // Sur téléphone, une résolution plus basse suffit pour des fils aussi fins.
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      lines = small ? 18 : 34
      const step = small ? 30 : 22
      const count = Math.ceil((width + 80) / step) + 1
      xs = new Float32Array(count)
      us = new Float32Array(count)
      for (let j = 0; j < count; j++) {
        const x = -40 + j * step
        xs[j] = x
        us[j] = x / width
      }
      base = new Float32Array(count)
      spread = new Float32Array(count)
      phi = new Float32Array(count)

      stars = Array.from({ length: small ? 40 : 90 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.6 + Math.random() * 1.1,
        alpha: 0.2 + Math.random() * 0.6,
        speed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        depth: 0.3 + Math.random() * 0.7,
      }))

      // Les fils passent de l'argent au citron, puis s'éteignent sur les bords.
      gradients = RIBBONS.map((_, i) => {
        const g = ctx.createLinearGradient(0, 0, width, 0)
        g.addColorStop(0, 'rgba(200, 205, 220, 0)')
        g.addColorStop(i ? 0.25 : 0.3, 'rgba(205, 212, 228, 0.5)')
        g.addColorStop(i ? 0.55 : 0.62, 'rgba(218, 236, 190, 0.5)')
        g.addColorStop(i ? 0.75 : 0.84, 'rgba(200, 255, 46, 0.34)')
        g.addColorStop(1, 'rgba(143, 216, 255, 0.05)')
        return g
      })
    }

    const draw = (t: number, scroll: number) => {
      ctx.globalAlpha = 1
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#e9ecf3'
      for (const s of stars) {
        let y = (s.y - scroll * 0.05 * s.depth) % height
        if (y < 0) y += height
        ctx.globalAlpha = s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.fillRect(s.x, y, s.size, s.size)
      }

      // Le scroll fait doucement onduler et glisser les rubans.
      const sway = Math.sin(scroll / 1400) * height * 0.06
      const drift = scroll * 0.0005
      ctx.lineWidth = 0.7
      RIBBONS.forEach((rb, r) => {
        for (let j = 0; j < xs.length; j++) {
          const u = us[j] ?? 0
          base[j] = height * (rb.y0 + rb.slope * u + rb.amp * Math.sin(u * rb.freq + rb.phase + t * rb.speed + drift)) + sway
          spread[j] = height * rb.spread * (0.55 + 0.45 * Math.sin(u * 2.2 - t * rb.speed * 1.3 + rb.phase))
          phi[j] = u * rb.twist + t * rb.speed * 2 + drift * 2
        }
        ctx.strokeStyle = gradients[r] ?? '#fff'
        for (let i = 0; i < lines; i++) {
          const theta = (i / (lines - 1)) * Math.PI
          ctx.globalAlpha = rb.alpha * (0.14 + 0.46 * Math.sin(theta))
          // Chaque fil ondule un peu à sa façon : c'est ce qui donne l'effet de soie.
          const shimmer = height * 0.01
          const offset = i * 0.37 + r
          ctx.beginPath()
          for (let j = 0; j < xs.length; j++) {
            const x = xs[j] ?? 0
            const u = us[j] ?? 0
            const y = (base[j] ?? 0) + (spread[j] ?? 0) * Math.cos(theta + (phi[j] ?? 0)) + shimmer * Math.sin(u * 7 + t * 0.35 + offset)
            if (j) ctx.lineTo(x, y)
            else ctx.moveTo(x, y)
          }
          ctx.stroke()
        }
      })
    }

    const still = () => draw(performance.now() / 1000, 0)

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      // Téléphone ou machine lente : une image sur deux suffit et évite de saccader.
      slow = slow * 0.95 + (now - last) * 0.05
      last = now
      frame++
      if ((small || slow > 26) && frame % 2) return
      draw(now / 1000, window.scrollY)
    }

    // data-state (live / still) : utile pour vérifier le mode calme dans les tests.
    const start = () => {
      if (raf || !awake || calmStore.get() || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
      canvas.dataset.state = 'live'
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
      canvas.dataset.state = 'still'
    }

    // Première image dessinée dès que le navigateur souffle, après l'affichage du contenu.
    resize()
    canvas.dataset.state = 'still'
    const first = window.requestIdleCallback ? window.requestIdleCallback(() => !raf && still(), { timeout: 1500 }) : window.setTimeout(() => !raf && still(), 300)

    let resizeFrame = 0
    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        resize()
        if (!raf) still()
      })
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const unsubscribe = calmStore.subscribe(() => {
      if (calmStore.get()) {
        stop()
        still()
      } else start()
    })

    const wake = () => {
      for (const name of WAKE_EVENTS) window.removeEventListener(name, wake)
      awake = true
      start()
    }
    for (const name of WAKE_EVENTS) window.addEventListener(name, wake, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      if (window.cancelIdleCallback) window.cancelIdleCallback(first)
      else window.clearTimeout(first)
      for (const name of WAKE_EVENTS) window.removeEventListener(name, wake)
      cancelAnimationFrame(resizeFrame)
      unsubscribe()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="ambient-glow" />
      <div className="ambient-shade" />
      <div className="ambient-grain" />
    </div>
  )
}
