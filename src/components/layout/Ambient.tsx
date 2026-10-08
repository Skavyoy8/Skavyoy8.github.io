'use client'

import { useEffect, useRef } from 'react'
import { calmStore } from '@/lib/calm'

/**
 * Fond animé en canvas 2D : un « paysage de signal ». Des lignes d'onde empilées en perspective
 * (les plus proches en bas, plus grandes) se cachent les unes les autres et ondulent lentement,
 * avec quelques étoiles au-dessus. Ni lib ni WebGL : quelques milliers de points par image.
 * L'image est dessinée tout de suite, mais elle ne s'anime qu'au premier geste du visiteur
 * (scroll, souris, toucher, clavier) : le chargement de la page reste léger.
 * Mode calme : une seule image figée. Onglet caché : l'animation s'arrête.
 */

const WAKE_EVENTS = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const

type Star = { x: number; y: number; size: number; alpha: number; speed: number; phase: number }

const BG = '#050506'

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
    // Enveloppe des pics : calme sur les bords, relief au centre-droit.
    let env = new Float32Array(0)
    let ys = new Float32Array(0)
    let stars: Star[] = []
    let stroke: CanvasGradient | null = null
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
      // Sur téléphone, une résolution plus basse suffit pour des lignes aussi fines.
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      lines = small ? 22 : 34
      const step = small ? 12 : 14
      const count = Math.ceil(width / step) + 2
      xs = new Float32Array(count)
      us = new Float32Array(count)
      env = new Float32Array(count)
      ys = new Float32Array(count)
      const center = small ? 0.5 : 0.58
      for (let j = 0; j < count; j++) {
        const x = Math.min(j * step, width)
        const u = x / width
        xs[j] = x
        us[j] = u
        env[j] = Math.exp(-((u - center) ** 2) / (2 * 0.17 ** 2))
      }

      stars = Array.from({ length: small ? 30 : 70 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.55,
        size: 0.6 + Math.random() * 1.1,
        alpha: 0.15 + Math.random() * 0.55,
        speed: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      }))

      // Lignes argentées sur les côtés, citron sur les sommets, éteintes aux bords.
      stroke = ctx.createLinearGradient(0, 0, width, 0)
      stroke.addColorStop(0, 'rgba(190, 196, 212, 0)')
      stroke.addColorStop(0.22, 'rgba(195, 202, 220, 0.9)')
      stroke.addColorStop(center, 'rgba(200, 255, 46, 1)')
      stroke.addColorStop(Math.min(center + 0.26, 0.95), 'rgba(143, 216, 255, 0.75)')
      stroke.addColorStop(1, 'rgba(143, 216, 255, 0)')
    }

    const draw = (t: number, scroll: number) => {
      ctx.globalAlpha = 1
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = '#e9ecf3'
      for (const s of stars) {
        ctx.globalAlpha = s.alpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase))
        ctx.fillRect(s.x, s.y, s.size, s.size)
      }

      // Le scroll fait avancer le paysage, comme un signal qui défile.
      const flow = t * 0.35 + scroll * 0.0016
      const n = xs.length
      ctx.lineWidth = 1
      for (let i = 0; i < lines; i++) {
        const d = i / (lines - 1)
        // Perspective : les lignes lointaines (en haut) sont serrées et plates.
        const base = height * (0.5 + 0.56 * d ** 1.55)
        const amp = height * 0.11 * (0.3 + 0.7 * d)
        for (let j = 0; j < n; j++) {
          const u = us[j] ?? 0
          const wave =
            0.55 * Math.sin(u * 9 + i * 0.55 - flow) +
            0.3 * Math.sin(u * 17.5 + i * 1.3 + flow * 1.4) +
            0.45 * Math.sin(u * 4.2 - i * 0.31 + flow * 0.6)
          ys[j] = base - amp * (env[j] ?? 0) * (0.75 + 0.5 * wave)
        }

        // Masque sous la ligne : elle cache les lignes plus lointaines, comme un relief.
        ctx.globalAlpha = 1
        ctx.fillStyle = BG
        ctx.beginPath()
        ctx.moveTo(xs[0] ?? 0, ys[0] ?? 0)
        for (let j = 1; j < n; j++) ctx.lineTo(xs[j] ?? 0, ys[j] ?? 0)
        ctx.lineTo(width, base + 4)
        ctx.lineTo(0, base + 4)
        ctx.closePath()
        ctx.fill()

        ctx.globalAlpha = 0.07 + 0.5 * d ** 1.3
        if (stroke) ctx.strokeStyle = stroke
        ctx.beginPath()
        ctx.moveTo(xs[0] ?? 0, ys[0] ?? 0)
        for (let j = 1; j < n; j++) ctx.lineTo(xs[j] ?? 0, ys[j] ?? 0)
        ctx.stroke()
      }
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
