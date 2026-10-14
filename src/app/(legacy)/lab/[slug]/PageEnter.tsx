/** Transition d'entrée : un rideau qui se retire vers le haut (CSS, coupé en mode calme). */
export function PageEnter() {
  return <div aria-hidden="true" className="curtain pointer-events-none fixed inset-0 z-[75] origin-top bg-surface" />
}
