/**
 * État partagé entre la chorégraphie GSAP (qui écrit) et la boucle useFrame (qui lit).
 * C'est un simple objet mutable : aucun re-render React, aucune allocation par frame.
 */
export const sceneState = {
  /** 0 noyau → 1 onde → 2 circuit → 3 rack → 4 portail */
  progress: 0,
  /** Onde : 0 sinus (analogique) → 1 carré (numérique) */
  square: 0,
  /** Rack : 0 assemblé → 1 vue éclatée */
  explode: 0,
  /** Rack : unité mise en avant (-1 = aucune) */
  focus: -1,
  /** Retrait de la 3D derrière les sections denses en texte (0 → 1) */
  dim: 0,
  /** Portail : accélération au survol du CTA (0 → 1, lissé dans useFrame) */
  portalHover: 0,
  /** Konami : glitch (retombe tout seul) */
  glitch: 0,
  /** Décalage horizontal de la scène, en unités monde (piloté par section) */
  offsetX: 0,
  /** Pointeur en coordonnées normalisées (-1 → 1) */
  pointer: { x: 0, y: 0 },
  /** Vrai après la première image rendue (sert au préloader) */
  ready: false,
  /** Étiquettes HTML du rack, positionnées par projection depuis la 3D */
  rackLabels: [] as (HTMLElement | null)[],
}

export type SceneState = typeof sceneState
