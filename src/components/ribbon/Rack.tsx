'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { type Group, PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { rackState } from '@/lib/rackState'
import { WORLD_H } from './path'
import { createRack, RACK_HEIGHT, type RackModel } from './rack3d'

const GAP = 0.34
const PULL = 0.85
const damp = (current: number, target: number, rate: number, dt: number) => current + (target - current) * (1 - Math.exp(-rate * dt))

/**
 * Le rack 3D vit dans la même scène que le ruban : il est posé, à chaque image,
 * sur la carte collante du homelab (data-rack-stage). La carte est transparente :
 * on voit le rack « à travers », éclairé et passé au bloom comme le reste.
 */
export function Rack() {
  const holder = useRef<Group>(null)
  const stage = useRef<HTMLElement | null>(null)
  const smooth = useRef({ explode: 0, pull: [0, 0, 0, 0, 0, 0, 0, 0], glow: [0, 0, 0, 0, 0, 0, 0, 0], time: 0 })
  const get = useThree((s) => s.get)

  useEffect(() => {
    const node = holder.current
    if (!node) return
    const rack = createRack()
    // Le modèle est rangé sur le groupe three (userData), pas dans l'état React.
    node.userData.rack = rack
    node.add(rack.root)
    stage.current = document.querySelector<HTMLElement>('[data-rack-stage]')

    // Reflets réalistes sur le métal : une pièce virtuelle filtrée (PMREM) sert d'environnement.
    const { gl, scene } = get()
    const pmrem = new PMREMGenerator(gl)
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = environment
    scene.environmentIntensity = 0.9
    document.documentElement.dataset.rack3d = 'true'

    return () => {
      node.remove(rack.root)
      rack.dispose()
      node.userData.rack = undefined
      get().scene.environment = null
      environment.dispose()
      pmrem.dispose()
      delete document.documentElement.dataset.rack3d
    }
  }, [get])

  useFrame((state, delta) => {
    const node = holder.current
    const rack = node?.userData.rack as RackModel | undefined
    if (!node || !rack) return
    const el = stage.current ?? document.querySelector<HTMLElement>('[data-rack-stage]')
    stage.current = el
    if (!el) {
      node.visible = false
      return
    }
    const dt = Math.min(delta, 0.1)
    const s = smooth.current
    s.time += dt
    const { width: vw, height: vh } = state.size
    const rect = el.getBoundingClientRect()
    const visible = rect.width > 0 && rect.bottom > -80 && rect.top < vh + 80
    node.visible = visible
    if (!visible) return
    // Mises à jour par méthodes three (setY, set, setValues) : aucun objet recréé à chaque image.

    // Carte DOM → monde : la caméra suit le scroll, on se cale sur sa ligne de visée.
    const k = WORLD_H / vh
    const halfW = (WORLD_H / 2) * (vw / vh)
    s.explode = damp(s.explode, rackState.explode, 4, dt)
    const extra = rack.levels * GAP * s.explode
    const total = RACK_HEIGHT + extra + 0.8
    const scale = Math.min((rect.height * k * 0.72) / total, (rect.width * k * 0.62) / 3.2)
    node.position.set(((rect.left + rect.width / 2) / vw) * 2 * halfW - halfW, state.camera.position.y - (rect.top + rect.height / 2 - vh / 2) * k, 0)
    node.scale.setScalar(scale)

    rack.pivot.position.setY(-extra / 2 - 0.25)
    rack.pivot.rotation.set(0.2, -0.62 + s.explode * 0.22 + Math.sin(s.time * 0.25) * 0.05, 0)

    // Vue éclatée : les étages s'écartent, les montants s'allongent, le dessus monte.
    const postScale = (RACK_HEIGHT + 0.12 + extra) / (RACK_HEIGHT + 0.12)
    for (const post of rack.posts) {
      post.scale.setY(postScale)
      post.position.setY((RACK_HEIGHT + extra) / 2)
    }
    rack.top.position.setY(RACK_HEIGHT + extra)
    const dac = Math.max(0, 1 - s.explode * 1.6)
    rack.dac.setValues({ opacity: dac, visible: dac > 0.01 })

    // L'unité de l'étape en cours sort du rack comme un tiroir et s'allume.
    rack.units.forEach((unit, i) => {
      const active = rackState.active === unit.id ? 1 : 0
      s.pull[i] = damp(s.pull[i]!, active, 5, dt)
      s.glow[i] = damp(s.glow[i]!, active, 6, dt)
      unit.group.position.set(0, unit.level >= 0 ? unit.base + unit.level * GAP * s.explode : unit.group.position.y, s.pull[i]! * PULL)
      unit.edges.setValues({ opacity: s.glow[i]! * 0.9 })
      unit.panel?.setValues({ emissiveIntensity: 2.4 + s.glow[i]! * 2.6 })
    })
  })

  return <group ref={holder} />
}
