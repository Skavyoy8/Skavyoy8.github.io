'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { sceneState } from '@/lib/sceneState'
import { particlesFragment, particlesVertex } from '@/shaders/particles'
import { EXPLODE_GAP, EXPLODE_Z, generateShapes, RACK_SCALE, RACK_UNITS } from './shapes'

type ParticleUniforms = {
  uTime: THREE.IUniform<number>
  uProgress: THREE.IUniform<number>
  uExplode: THREE.IUniform<number>
  uFocus: THREE.IUniform<number>
  uVisible: THREE.IUniform<number>
  uGlitch: THREE.IUniform<number>
  uPointer: THREE.IUniform<THREE.Vector3>
  uPointerStrength: THREE.IUniform<number>
  uSize: THREE.IUniform<number>
  uPixelRatio: THREE.IUniform<number>
  uViewHeight: THREE.IUniform<number>
}

type Scratch = {
  ray: THREE.Vector3
  dir: THREE.Vector3
  hit: THREE.Vector3
  label: THREE.Vector3
  smooth: { progress: number; explode: number; focus: number; visible: number; offsetX: number; strength: number }
  lastPointer: { x: number; y: number }
  labelOpacity: Float32Array
}

const damp = (current: number, target: number, lambda: number, delta: number) => current + (target - current) * (1 - Math.exp(-lambda * delta))

function createScratch(): Scratch {
  return {
    ray: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    hit: new THREE.Vector3(),
    label: new THREE.Vector3(),
    smooth: { progress: 0, explode: 0, focus: 0, visible: 0, offsetX: sceneState.offsetX, strength: 0 },
    lastPointer: { x: 0, y: 0 },
    labelOpacity: new Float32Array(RACK_UNITS).fill(-1),
  }
}

export function Particles({ count, fraction }: { count: number; fraction: number }) {
  const data = useMemo(() => generateShapes(count), [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(data.circuit, 3))
    g.setAttribute('aRack', new THREE.BufferAttribute(data.rack, 3))
    g.setAttribute('aRand', new THREE.BufferAttribute(data.rand, 4))
    g.setAttribute('aMeta', new THREE.BufferAttribute(data.meta, 4))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8)
    return g
  }, [data])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particlesVertex,
        fragmentShader: particlesFragment,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uExplode: { value: 0 },
          uFocus: { value: 0 },
          uVisible: { value: 0 },
          uGlitch: { value: 0 },
          uPointer: { value: new THREE.Vector3(99, 99, 0) },
          uPointerStrength: { value: 0 },
          uSize: { value: 3.1 },
          uPixelRatio: { value: 1 },
          uViewHeight: { value: 900 },
        },
      }),
    [],
  )

  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])
  useEffect(() => {
    geometry.setDrawRange(0, Math.floor(count * fraction))
  }, [geometry, count, fraction])

  const group = useRef<THREE.Group>(null)
  const points = useRef<THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>>(null)
  const scratch = useRef<Scratch | null>(null)

  useFrame((state, rawDelta) => {
    const g = group.current
    const pts = points.current
    if (!g || !pts) return
    scratch.current ??= createScratch()
    const sc = scratch.current
    const sm = sc.smooth
    const delta = Math.min(rawDelta, 0.05)
    const u = pts.material.uniforms as unknown as ParticleUniforms
    const s = sceneState

    sm.progress = damp(sm.progress, s.progress, 6, delta)
    sm.explode = damp(sm.explode, s.explode, 7, delta)
    sm.focus = damp(sm.focus, s.focus, 6, delta)
    sm.visible = damp(sm.visible, s.visible, 5, delta)
    if (sm.visible < 0.002 && s.visible === 0) sm.visible = 0
    sm.offsetX = damp(sm.offsetX, s.offsetX, 4, delta)
    s.shown = sm.visible
    s.glitch = Math.max(0, s.glitch - delta * 1.2)

    // Le pointeur n'agit que s'il bouge (sinon la répulsion retombe).
    const pointer = s.pointer
    const moved = Math.abs(pointer.x - sc.lastPointer.x) + Math.abs(pointer.y - sc.lastPointer.y) > 0.0005
    sc.lastPointer.x = pointer.x
    sc.lastPointer.y = pointer.y
    sm.strength = damp(sm.strength, moved ? 1 : 0, moved ? 8 : 1.2, delta)

    // Parallaxe caméra douce.
    const cam = state.camera
    cam.position.x = damp(cam.position.x, pointer.x * 0.3, 2.5, delta)
    cam.position.y = damp(cam.position.y, pointer.y * 0.2, 2.5, delta)
    cam.lookAt(0, 0, 0)

    const width = state.size.width
    const scale = width < 640 ? 0.75 : width < 1024 ? 0.85 : 1
    g.scale.setScalar(scale)
    g.position.x = sm.offsetX
    g.rotation.y = pointer.x * 0.1 - 0.5 * sm.explode
    g.rotation.x = -pointer.y * 0.06 + 0.12 * sm.explode
    g.updateMatrixWorld()

    // Rayon souris → plan z = 0 → espace local du groupe.
    sc.ray.set(pointer.x, pointer.y, 0.5).unproject(cam)
    sc.dir.copy(sc.ray).sub(cam.position).normalize()
    sc.hit.copy(cam.position).addScaledVector(sc.dir, -cam.position.z / sc.dir.z)
    g.worldToLocal(sc.hit)

    u.uTime.value = state.clock.elapsedTime
    u.uProgress.value = sm.progress
    u.uExplode.value = sm.explode
    u.uFocus.value = sm.focus
    u.uVisible.value = sm.visible
    u.uGlitch.value = s.glitch
    u.uPointer.value.copy(sc.hit)
    u.uPointerStrength.value = sm.strength
    u.uPixelRatio.value = state.gl.getPixelRatio()
    u.uViewHeight.value = state.size.height

    // Légendes HTML du rack, projetées depuis la 3D (même formule que le shader).
    const labels = s.rackLabels
    const visible = sm.explode * sm.progress * sm.visible
    for (let i = 0; i < RACK_UNITS; i++) {
      const el = labels[i]
      if (!el) continue
      // Les légendes s'effacent quand le panneau des services prend le relais.
      const opacity = visible > 0.02 ? Math.min(1, visible * 1.4) * (1 - sm.focus) : 0
      if (Math.abs(opacity - (sc.labelOpacity[i] ?? -1)) > 0.005) {
        el.style.opacity = opacity.toFixed(3)
        sc.labelOpacity[i] = opacity
      }
      if (opacity <= 0) continue
      const ax = data.anchors[i * 3] as number
      const ay = data.anchors[i * 3 + 1] as number
      const az = data.anchors[i * 3 + 2] as number
      sc.label.set(ax, ay + (3.5 - i) * EXPLODE_GAP * sm.explode, az + EXPLODE_Z * sm.explode).multiplyScalar(RACK_SCALE)
      g.localToWorld(sc.label)
      sc.label.project(cam)
      const x = (sc.label.x * 0.5 + 0.5) * width
      const y = (-sc.label.y * 0.5 + 0.5) * state.size.height
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    }
  })

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  )
}
