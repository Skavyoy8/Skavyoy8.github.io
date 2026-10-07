const GLYPHS = '01<>/\\[]{}—=+*#_'

/**
 * Effet « décryptage » : les lettres se stabilisent de gauche à droite.
 * Renvoie une fonction d'annulation. Utilisé hors GSAP pour l'UI (nav, menu).
 */
export function scrambleTo(el: HTMLElement, text: string, duration = 650): () => void {
  if (document.documentElement.dataset.calm === 'true') {
    el.textContent = text
    return () => {}
  }
  const from = el.textContent ?? ''
  const length = Math.max(from.length, text.length)
  const start = performance.now()
  let frame = 0
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    let out = ''
    for (let i = 0; i < length; i++) {
      const at = i / length
      const target = text[i] ?? ''
      if (progress >= at * 0.7 + 0.3) out += target
      else if (progress >= at * 0.7) out += target === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      else out += from[i] ?? ''
    }
    el.textContent = out
    if (progress < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
