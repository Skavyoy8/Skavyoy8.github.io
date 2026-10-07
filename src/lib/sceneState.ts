/**
 * État partagé entre la séquence GSAP du Lab (qui écrit) et la boucle useFrame (qui lit).
 * C'est un simple objet mutable : aucun re-render React, aucune allocation par frame.
 */
export const sceneState = {
  /** Visibilité de la scène (0 → 1) : la 3D n'existe que pendant la séquence du Lab. */
  visible: 0,
  /** Visibilité lissée, écrite par useFrame (la boucle de rendu s'arrête quand elle vaut 0). */
  shown: 0,
  /** 0 pistes de circuit → 1 rack 10" assemblé */
  progress: 0,
  /** Rack : 0 assemblé → 1 vue éclatée */
  explode: 0,
  /** Rack : mise en avant du serveur MS-01 (0 → 1) */
  focus: 0,
  /** Konami : glitch (retombe tout seul) */
  glitch: 0,
  /** Décalage horizontal du rack, en unités monde */
  offsetX: 0,
  /** Pointeur en coordonnées normalisées (-1 → 1) */
  pointer: { x: 0, y: 0 },
  /** Étiquettes HTML du rack, positionnées par projection depuis la 3D */
  rackLabels: [] as (HTMLElement | null)[],
}

export type SceneState = typeof sceneState
