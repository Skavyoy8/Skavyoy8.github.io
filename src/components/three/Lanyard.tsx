'use client'

import { PerspectiveCamera, View } from '@react-three/drei'
import { type ThreeEvent, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, type RapierRigidBody, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { type BadgeTextures, createBadgeTextures } from './badgeTextures'

const SEGMENTS = 40
const BAND_WIDTH = 0.16
const CARD = { w: 1.6, h: 2.25, d: 0.02 }

type Scratch = {
  vec: THREE.Vector3
  dir: THREE.Vector3
  ang: THREE.Vector3
  rot: THREE.Vector3
  angTarget: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  lerp1: THREE.Vector3 | null
  lerp2: THREE.Vector3 | null
  tmp: THREE.Vector3
  side: THREE.Vector3
  points: THREE.Vector3[]
  curve: THREE.CatmullRomCurve3
}

function createScratch(): Scratch {
  return {
    vec: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    ang: new THREE.Vector3(),
    rot: new THREE.Vector3(),
    angTarget: { x: 0, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 },
    lerp1: null,
    lerp2: null,
    tmp: new THREE.Vector3(),
    side: new THREE.Vector3(),
    points: Array.from({ length: SEGMENTS + 1 }, () => new THREE.Vector3()),
    curve: new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  }
}

/** Ruban préalloué : ses sommets sont réécrits en place à chaque image (aucune allocation). */
function createRibbon() {
  const g = new THREE.BufferGeometry()
  const positions = new Float32Array((SEGMENTS + 1) * 2 * 3)
  const uvs = new Float32Array((SEGMENTS + 1) * 2 * 2)
  const index: number[] = []
  for (let i = 0; i <= SEGMENTS; i++) {
    uvs.set([i / SEGMENTS, 0, i / SEGMENTS, 1], i * 4)
    if (i < SEGMENTS) {
      const a = i * 2
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  g.setIndex(index)
  return g
}

function Band({ textures, onDrag }: { textures: BadgeTextures; onDrag: (dragging: boolean) => void }) {
  const band = useRef<THREE.Mesh<THREE.BufferGeometry>>(null)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<RapierRigidBody>(null!)
  const j2 = useRef<RapierRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)
  const scratch = useRef<Scratch | null>(null)
  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null)

  const ribbon = useMemo(() => createRibbon(), [])
  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#16161b', roughness: 0.6 })
    const front = new THREE.MeshStandardMaterial({ map: textures.front, roughness: 0.38, metalness: 0.05 })
    const back = new THREE.MeshStandardMaterial({ map: textures.back, roughness: 0.38, metalness: 0.05 })
    return [edge, edge, edge, edge, front, back]
  }, [textures])
  const bandMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: textures.band, side: THREE.DoubleSide }), [textures])

  useEffect(() => () => ribbon.dispose(), [ribbon])
  useEffect(
    () => () => {
      for (const m of new Set(materials)) m.dispose()
      bandMaterial.dispose()
    },
    [materials, bandMaterial],
  )

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD.h / 2 + 0.2, 0],
  ])

  useFrame((state, delta) => {
    const f = fixed.current
    const b1 = j1.current
    const b2 = j2.current
    const b3 = j3.current
    const c = card.current
    const mesh = band.current
    if (!f || !b1 || !b2 || !b3 || !c || !mesh) return
    scratch.current ??= createScratch()
    const s = scratch.current

    if (dragged) {
      s.vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      s.dir.copy(s.vec).sub(state.camera.position).normalize()
      s.vec.add(s.dir.multiplyScalar(state.camera.position.length()))
      for (const body of [c, b1, b2, b3, f]) body.wakeUp()
      s.target.x = s.vec.x - dragged.x
      s.target.y = s.vec.y - dragged.y
      s.target.z = s.vec.z - dragged.z
      c.setNextKinematicTranslation(s.target)
    }

    // Lissage des articulations (évite les tremblements de la corde).
    const t1 = b1.translation()
    const t2 = b2.translation()
    s.lerp1 ??= new THREE.Vector3(t1.x, t1.y, t1.z)
    s.lerp2 ??= new THREE.Vector3(t2.x, t2.y, t2.z)
    for (const [lerped, t] of [
      [s.lerp1, t1],
      [s.lerp2, t2],
    ] as const) {
      s.tmp.set(t.x, t.y, t.z)
      const d = Math.max(0.1, Math.min(1, lerped.distanceTo(s.tmp)))
      lerped.lerp(s.tmp, Math.min(1, delta * (10 + d * 40)))
    }
    const t3 = b3.translation()
    const tf = f.translation()
    const pts = s.curve.points
    pts[0]?.set(t3.x, t3.y, t3.z)
    pts[1]?.copy(s.lerp2)
    pts[2]?.copy(s.lerp1)
    pts[3]?.set(tf.x, tf.y, tf.z)

    for (let i = 0; i <= SEGMENTS; i++) s.curve.getPoint(i / SEGMENTS, s.points[i])
    const position = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = position.array as Float32Array
    for (let i = 0; i <= SEGMENTS; i++) {
      const p = s.points[i] as THREE.Vector3
      const next = s.points[Math.min(SEGMENTS, i + 1)] as THREE.Vector3
      const prev = s.points[Math.max(0, i - 1)] as THREE.Vector3
      s.side.subVectors(next, prev)
      s.side.set(-s.side.y, s.side.x, 0).normalize().multiplyScalar(BAND_WIDTH / 2)
      arr[i * 6] = p.x + s.side.x
      arr[i * 6 + 1] = p.y + s.side.y
      arr[i * 6 + 2] = p.z
      arr[i * 6 + 3] = p.x - s.side.x
      arr[i * 6 + 4] = p.y - s.side.y
      arr[i * 6 + 5] = p.z
    }
    position.needsUpdate = true
    mesh.geometry.computeBoundingSphere()

    // Ramène doucement la carte face caméra.
    const av = c.angvel()
    const rot = c.rotation()
    s.angTarget.x = av.x
    s.angTarget.y = av.y - rot.y * 0.25
    s.angTarget.z = av.z
    c.setAngvel(s.angTarget, true)
  })

  const onDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const c = card.current
    if (!c) return
    try {
      ;(event.target as unknown as Element).setPointerCapture(event.pointerId)
    } catch {
      // pointeur déjà relâché : le drag continue sans capture
    }
    const t = c.translation()
    setDragged(new THREE.Vector3().copy(event.point).sub(new THREE.Vector3(t.x, t.y, t.z)))
    onDrag(true)
  }
  const onUp = (event: ThreeEvent<PointerEvent>) => {
    try {
      ;(event.target as unknown as Element).releasePointerCapture(event.pointerId)
    } catch {
      // rien à relâcher
    }
    setDragged(null)
    onDrag(false)
  }

  const segment = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 }

  return (
    <>
      <group position={[0, 4.2, 0]}>
        <RigidBody ref={fixed} {...segment} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segment}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segment} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[CARD.w / 2, CARD.h / 2, CARD.d]} />
          <mesh onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={onUp} material={materials}>
            <boxGeometry args={[CARD.w, CARD.h, CARD.d]} />
          </mesh>
          <mesh position={[0, CARD.h / 2 + 0.08, 0]}>
            <boxGeometry args={[0.36, 0.14, 0.07]} />
            <meshStandardMaterial color="#8b8b94" metalness={0.9} roughness={0.25} />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={ribbon} material={bandMaterial} frustumCulled={false} />
    </>
  )
}

export default function Lanyard({ onReady }: { onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [textures, setTextures] = useState<BadgeTextures | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let alive = true
    let created: BadgeTextures | null = null
    createBadgeTextures()
      .then((t) => {
        created = t
        if (alive) setTextures(t)
      })
      .catch(() => {
        // le badge statique reste affiché
      })
    return () => {
      alive = false
      if (created) for (const t of Object.values(created)) t.dispose()
    }
  }, [])

  useEffect(() => {
    if (textures) onReady()
  }, [textures, onReady])

  const onDrag = useCallback((dragging: boolean) => {
    if (wrap.current) wrap.current.dataset.dragging = String(dragging)
  }, [])

  // Physique en pause quand la section n'est pas à l'écran.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0" style={{ touchAction: 'none' }} data-cursor="drag" data-badge-3d={textures ? 'ready' : 'loading'} data-dragging="false">
      <View className="absolute inset-0" index={2}>
        <PerspectiveCamera makeDefault position={[0, 0, 13]} fov={25} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 6]} intensity={2.6} />
        <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#6ae4ff" />
        {textures ? (
          <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={!visible} interpolate>
            <Band textures={textures} onDrag={onDrag} />
          </Physics>
        ) : null}
      </View>
    </div>
  )
}
