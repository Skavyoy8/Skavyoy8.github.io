import { CatmullRomCurve3, Vector3 } from 'three'

/**
 * Le chemin du ruban, accroché à la page : chaque ancre est posée dans une section
 * (fraction de sa hauteur + décalage en hauteurs d'écran). La caméra suit le scroll
 * au pixel près, donc le ruban serpente derrière les sections comme s'il était imprimé dessus.
 *
 * x : -1 bord gauche → 1 bord droit ; z : profondeur (en demi-hauteurs d'écran) ;
 * spread : écartement du faisceau (en demi-hauteurs) ; glow : surbrillance (le sommet du héros) ;
 * light : intensité (1 par défaut, plus bas derrière le rack pour qu'il reste lisible).
 */
type Anchor = { id: string; f: number; dy: number; x: number; z?: number; spread: number; glow?: number; light?: number }

const anchors: Anchor[] = [
  // Héros : éventail venu du haut à droite, sommet lumineux sous les boutons, puis départ vers la droite.
  { id: 'accueil', f: 0, dy: -0.75, x: 1.5, z: 0.3, spread: 0.8 },
  { id: 'accueil', f: 0, dy: 0.05, x: 0.78, z: 0.15, spread: 0.55 },
  { id: 'accueil', f: 0, dy: 0.5, x: 0.18, z: 0, spread: 0.2 },
  { id: 'accueil', f: 0, dy: 0.84, x: -0.06, z: 0, spread: 0.03, glow: 1 },
  { id: 'accueil', f: 0, dy: 1.02, x: 0.14, z: 0, spread: 0.13 },
  { id: 'accueil', f: 0, dy: 1.28, x: 0.6, z: 0.1, spread: 0.26 },
  // À propos : grande diagonale derrière les cartes.
  { id: 'a-propos', f: 0.25, dy: 0, x: 0.3, z: -0.2, spread: 0.3 },
  { id: 'a-propos', f: 0.7, dy: 0, x: -0.55, z: 0, spread: 0.32 },
  // Manifeste : traversée horizontale derrière la carte citron.
  { id: 'manifeste', f: 0.05, dy: 0, x: 1.4, z: 0, spread: 0.2 },
  { id: 'manifeste', f: 0.22, dy: 0, x: 0.1, z: 0.1, spread: 0.22 },
  { id: 'manifeste', f: 0.32, dy: 0, x: -1.4, z: 0, spread: 0.24 },
  { id: 'manifeste', f: 0.6, dy: 0, x: -0.4, z: 0, spread: 0.24 },
  { id: 'manifeste', f: 0.9, dy: 0, x: 0.55, z: 0, spread: 0.22 },
  // Lab : le ruban longe la gauche et passe derrière le rack 3D, comme des fibres qui l'alimentent.
  { id: 'lab', f: 0.03, dy: 0, x: 0.72, z: 0, spread: 0.26 },
  { id: 'lab', f: 0.13, dy: 0, x: -0.42, z: -0.2, spread: 0.3, light: 0.4 },
  { id: 'lab', f: 0.28, dy: 0, x: -0.62, z: -0.3, spread: 0.26, light: 0.4 },
  { id: 'lab', f: 0.43, dy: 0, x: -0.38, z: -0.3, spread: 0.3, light: 0.4 },
  { id: 'lab', f: 0.58, dy: 0, x: -0.6, z: -0.2, spread: 0.26, light: 0.4 },
  { id: 'lab', f: 0.74, dy: 0, x: 0.15, z: 0, spread: 0.28 },
  { id: 'lab', f: 0.92, dy: 0, x: 0.62, z: 0, spread: 0.26 },
  // Ce que j'apprends : le ruban zigzague de part et d'autre.
  { id: 'interets', f: 0.12, dy: 0, x: -0.15, z: 0.1, spread: 0.26 },
  { id: 'interets', f: 0.34, dy: 0, x: 0.62, z: 0, spread: 0.3 },
  { id: 'interets', f: 0.58, dy: 0, x: -0.62, z: -0.1, spread: 0.3 },
  { id: 'interets', f: 0.84, dy: 0, x: 0.45, z: 0, spread: 0.26 },
  // Parcours, rooms, badges.
  { id: 'parcours', f: 0.3, dy: 0, x: 0.62, z: 0, spread: 0.28 },
  { id: 'parcours', f: 0.75, dy: 0, x: -0.5, z: 0.1, spread: 0.3 },
  { id: 'rooms', f: 0.5, dy: 0, x: 0.55, z: 0, spread: 0.26 },
  { id: 'badges', f: 0.5, dy: 0, x: -0.4, z: 0, spread: 0.26 },
  // Contact : vague horizontale nette, puis une dernière traversée au-dessus du pied de page.
  { id: 'reseaux', f: 0, dy: -0.15, x: -1.5, z: 0, spread: 0.26 },
  { id: 'reseaux', f: 0, dy: 0.1, x: -0.45, z: 0.25, spread: 0.36 },
  { id: 'reseaux', f: 0, dy: 0.0, x: 0.45, z: -0.2, spread: 0.4 },
  { id: 'reseaux', f: 0, dy: 0.18, x: 1.5, z: 0, spread: 0.32 },
  { id: 'reseaux', f: 1, dy: -0.12, x: 0.75, z: 0.2, spread: 0.36 },
  { id: 'reseaux', f: 1, dy: -0.04, x: -0.35, z: -0.25, spread: 0.42 },
  { id: 'reseaux', f: 1, dy: -0.1, x: -1.6, z: 0, spread: 0.34 },
]

/** Échantillons du chemin rangés dans une texture : 3 lignes de SAMPLES texels RGBA. */
export const SAMPLES = 4096

/** Taille du monde : la hauteur de l'écran vaut 10 unités à z = 0. */
export const WORLD_H = 10

export type Spine = {
  data: Float32Array
  /** Ordonnée de page (px) de chaque échantillon, pour savoir quelle portion est visible. */
  pageY: Float32Array
  /** Longueur du chemin en unités monde. */
  length: number
  /** Position (0 → 1) du sommet lumineux. */
  vertexT: number
}

export function createSpine(): Spine {
  return { data: new Float32Array(SAMPLES * 4 * 3), pageY: new Float32Array(SAMPLES), length: 1, vertexT: 0 }
}

/** Mesure les sections et reconstruit le chemin. Faux si la page n'a pas encore ses sections. */
export function buildSpine(spine: Spine, viewport: { width: number; height: number }): boolean {
  const vh = viewport.height
  const k = WORLD_H / vh
  const halfW = (WORLD_H / 2) * (viewport.width / vh)
  const halfH = WORLD_H / 2
  const boxes = new Map<string, { top: number; height: number }>()
  for (const anchor of anchors) {
    if (boxes.has(anchor.id)) continue
    const el = document.getElementById(anchor.id)
    if (!el) return false
    const rect = el.getBoundingClientRect()
    boxes.set(anchor.id, { top: rect.top + window.scrollY, height: rect.height })
  }

  const points = anchors.map((a) => {
    const box = boxes.get(a.id)!
    const pageY = box.top + a.f * box.height + a.dy * vh
    return new Vector3(a.x * halfW, -pageY * k, (a.z ?? 0) * halfH)
  })
  const curve = new CatmullRomCurve3(points, false, 'centripetal', 0.5)
  // Table de longueurs fine : les échantillons sont répartis à longueur d'arc égale.
  curve.arcLengthDivisions = SAMPLES
  const lengths = curve.getLengths()
  const length = lengths[lengths.length - 1]!

  // La courbe passe par l'ancre i en u = i / (n - 1) ; on convertit en abscisse curviligne (0 → 1)
  // pour interpoler l'écartement et la surbrillance entre deux ancres.
  const anchorArc = points.map((_, i) => lengths[Math.round((i / (points.length - 1)) * SAMPLES)]! / length)

  const { data, pageY } = spine
  const pos = new Vector3()
  const tangent = new Vector3()
  let vertexT = 0
  let best = Infinity
  let a = 0
  for (let i = 0; i < SAMPLES; i++) {
    const t = i / (SAMPLES - 1)
    curve.getPointAt(t, pos)
    curve.getTangentAt(t, tangent)
    while (a < anchorArc.length - 2 && anchorArc[a + 1]! < t) a++
    const t0 = anchorArc[a]!
    const t1 = anchorArc[a + 1]!
    const m = Math.min(Math.max((t - t0) / Math.max(t1 - t0, 1e-6), 0), 1)
    const s = m * m * (3 - 2 * m)
    const A = anchors[a]!
    const B = anchors[a + 1]!
    const spread = (A.spread + (B.spread - A.spread) * s) * halfH
    const glow = (A.glow ?? 0) + ((B.glow ?? 0) - (A.glow ?? 0)) * s
    const light = (A.light ?? 1) + ((B.light ?? 1) - (A.light ?? 1)) * s

    // Normale dans le plan de l'écran : le faisceau s'étale « à plat », la torsion fait le reste.
    const nx = -tangent.y
    const ny = tangent.x
    const nl = Math.hypot(nx, ny) || 1

    data.set([pos.x, pos.y, pos.z, spread], i * 4)
    data.set([nx / nl, ny / nl, 0, glow], (SAMPLES + i) * 4)
    data.set([tangent.x, tangent.y, tangent.z, light], (SAMPLES * 2 + i) * 4)
    pageY[i] = -pos.y / k
    if (glow > 0.5) {
      const d = Math.abs(spread)
      if (d < best) {
        best = d
        vertexT = t
      }
    }
  }
  spine.length = length
  spine.vertexT = vertexT
  return true
}

/** Portion du chemin (t0 → t1) qui touche la fenêtre visible, marges comprises. */
export function visibleRange(spine: Spine, top: number, bottom: number, out: { t0: number; t1: number; any: boolean }) {
  let first = -1
  let last = -1
  const { pageY } = spine
  for (let i = 0; i < SAMPLES; i++) {
    const y = pageY[i]!
    if (y >= top && y <= bottom) {
      if (first < 0) first = i
      last = i
    }
  }
  out.any = first >= 0
  if (!out.any) return out
  out.t0 = Math.max(0, first - 24) / (SAMPLES - 1)
  out.t1 = Math.min(SAMPLES - 1, last + 24) / (SAMPLES - 1)
  return out
}
