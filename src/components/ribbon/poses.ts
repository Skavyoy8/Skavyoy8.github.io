/**
 * Forme du ruban dans le héros, pour l'image statique (RibbonPoster) : affichée tout de suite,
 * puis remplacée par la scène 3D ; seule image du fond en mode calme, sans WebGL ou sur téléphone.
 * x : fraction de la demi-largeur (-1 → 1), y : fraction de la demi-hauteur (1 en haut), z : profondeur.
 */
export type Vec3 = readonly [number, number, number]

export type Pose = {
  points: readonly [Vec3, Vec3, Vec3, Vec3, Vec3, Vec3]
  /** Position (0 → 1) du pincement le long du ruban. */
  pinch: number
  /** Écartement au pincement, puis aux deux extrémités (en demi-hauteurs d'écran). */
  spread: readonly [near: number, start: number, end: number]
  /** Nombre de tours de torsion sur la longueur. */
  twist: number
}

// Épingle à cheveux : sommet lumineux à gauche du centre, éventail vers la droite.
const landscape: Pose = {
  points: [
    [1.3, 1.45, 0],
    [0.62, 0.62, 0.05],
    [0.02, 0.02, 0],
    [-0.3, -0.38, -0.05],
    [0.02, -0.78, 0],
    [0.55, -1.45, 0],
  ],
  pinch: 0.6,
  spread: [0.012, 0.5, 0.2],
  twist: 0.6,
}

// Écrans en hauteur : la même épingle, recomposée pour un téléphone.
const portrait: Pose = {
  ...landscape,
  points: [
    [1.5, 0.95, 0],
    [0.75, 0.4, 0.05],
    [0.0, -0.02, 0],
    [-0.55, -0.32, -0.05],
    [-0.05, -0.62, 0],
    [0.9, -1.2, 0],
  ],
  spread: [0.01, 0.34, 0.2],
}

export function getPose(aspect: number): Pose {
  return aspect < 0.85 ? portrait : landscape
}

/** Colonne vertébrale : Catmull-Rom uniforme sur 6 points. */
export function spine(points: Pose['points'], t: number, out: [number, number, number]) {
  const x = Math.min(Math.max(t, 0), 1) * 5
  const i = Math.min(Math.floor(x), 4)
  const u = x - i
  const p0 = points[Math.max(i - 1, 0)]!
  const p1 = points[i]!
  const p2 = points[i + 1]!
  const p3 = points[Math.min(i + 2, 5)]!
  const u2 = u * u
  const u3 = u2 * u
  for (let k = 0; k < 3; k++) {
    out[k] =
      0.5 *
      (2 * p1[k]! + (-p0[k]! + p2[k]!) * u + (2 * p0[k]! - 5 * p1[k]! + 4 * p2[k]! - p3[k]!) * u2 + (-p0[k]! + 3 * p1[k]! - 3 * p2[k]! + p3[k]!) * u3)
  }
  return out
}

/** Écartement des fibres en t, avec un pincement lissé. */
export function spreadAt(pose: Pose, t: number) {
  const [near, start, end] = pose.spread
  const far = t < pose.pinch ? start : end
  const d = Math.abs(t - pose.pinch) / Math.max(t < pose.pinch ? pose.pinch : 1 - pose.pinch, 0.001)
  const s = Math.min(Math.max(d, 0), 1)
  return near + (far - near) * s * s * (3 - 2 * s)
}
