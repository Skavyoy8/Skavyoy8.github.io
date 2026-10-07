'use client'

import { advance, Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AddEquation,
  CustomBlending,
  OneFactor,
  DoubleSide,
  DataTexture,
  FloatType,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  NearestFilter,
  RGBAFormat,
  ShaderMaterial,
  Uint16BufferAttribute,
  type Mesh,
  type PerspectiveCamera,
} from 'three'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ribbonState } from '@/lib/ribbonState'
import { dustFragment, dustVertex, fiberFragment, fiberVertex } from '@/shaders/fibers'
import { buildSpine, createSpine, SAMPLES, visibleRange, WORLD_H } from './path'
import { Rack } from './Rack'
import { isSoftwareRenderer, markWebGLFailed } from './webgl'

/**
 * Le fond façon « Relay » : un long faisceau de fibres en 3D qui serpente sur toute la page,
 * une caméra qui suit le scroll au pixel près, et un bloom HDR qui fait briller les fibres.
 * Le rendu est piloté par gsap.ticker, juste après Lenis : le ruban ne décroche jamais du texte.
 */

const FOV = 32
const DISTANCE = WORLD_H / 2 / Math.tan(((FOV / 2) * Math.PI) / 180)

type Quality = { strands: number; segments: number; dust: number; skip: number }
const HIGH: Quality = { strands: 300, segments: 900, dust: 2600, skip: 1 }
// Sans GPU (rendu logiciel) : peu de fibres, deux images par seconde, demi-résolution.
const LOW: Quality = { strands: 48, segments: 280, dust: 240, skip: 30 }

// Le fondu d'intro ne se joue qu'une fois par visite.
const shared = { ready: false }

function random(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function useSpine() {
  return useMemo(() => {
    const spine = createSpine()
    const texture = new DataTexture(spine.data, SAMPLES, 3, RGBAFormat, FloatType)
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.needsUpdate = true
    return { spine, texture }
  }, [])
}

function Fibers({ quality }: { quality: Quality }) {
  const { spine, texture } = useSpine()
  const size = useThree((s) => s.size)
  const dpr = useThree((s) => s.viewport.dpr)
  const range = useRef({ t0: 0, t1: 1, any: true })
  const intro = useRef({ value: 0 })
  const lastScroll = useRef(0)
  const lift = useRef(0)
  const mesh = useRef<Mesh>(null)

  const fiberGeometry = useMemo(() => {
    const seg = quality.segments
    const geometry = new InstancedBufferGeometry()
    const coords = new Float32Array((seg + 1) * 2 * 3)
    for (let j = 0; j <= seg; j++) {
      coords.set([j / seg, -1, 0, j / seg, 1, 0], j * 6)
    }
    const indices = new Uint16Array(seg * 6)
    for (let j = 0; j < seg; j++) {
      const a = j * 2
      indices.set([a, a + 1, a + 2, a + 1, a + 3, a + 2], j * 6)
    }
    geometry.setAttribute('position', new Float32BufferAttribute(coords, 3))
    geometry.setIndex(new Uint16BufferAttribute(indices, 1))

    // Les fibres vont par petits faisceaux : des bandes de lumière séparées par du noir.
    const rand = random(7)
    const n = quality.strands
    const clusters = 26
    const centers = Array.from({ length: clusters }, () => [rand() * 2 - 1, rand() * 2 - 1, rand()] as const)
    const strands = new Float32Array(n * 4)
    for (let i = 0; i < n; i++) {
      const [cx, cy, cp] = centers[i % clusters]!
      strands.set([Math.max(-1, Math.min(1, cx + (rand() - 0.5) * 0.2)), cy + (rand() - 0.5) * 0.3, (cp + rand() * 0.08) % 1, Math.pow(rand(), 1.15)], i * 4)
    }
    geometry.setAttribute('aStrand', new InstancedBufferAttribute(strands, 4))
    geometry.instanceCount = n
    return geometry
  }, [quality])

  const dustGeometry = useMemo(() => {
    const rand = random(19)
    const geometry = new BufferGeometry()
    const pos = new Float32Array(quality.dust * 3)
    const dust = new Float32Array(quality.dust * 4)
    for (let i = 0; i < quality.dust; i++) {
      pos.set([rand(), 0, 0], i * 3)
      const g = (rand() + rand() + rand()) / 1.5 - 1
      dust.set([g, rand() * 2 - 1, rand(), rand()], i * 4)
    }
    geometry.setAttribute('position', new Float32BufferAttribute(pos, 3))
    geometry.setAttribute('aDust', new Float32BufferAttribute(dust, 4))
    return geometry
  }, [quality])

  const uniforms = useMemo(
    () => ({
      uSpine: { value: texture },
      uSamples: { value: SAMPLES },
      uLength: { value: 1 },
      uTime: { value: 0 },
      uTwist: { value: 0.11 },
      uRes: { value: [1, 1] as [number, number] },
      uT0: { value: 0 },
      uT1: { value: 1 },
      uDpr: { value: 1 },
      uIntro: { value: 0 },
      uVertexT: { value: 0 },
      uGlitch: { value: 0 },
      uFlow: { value: 0 },
    }),
    [texture],
  )

  const fiberMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: fiberVertex,
        fragmentShader: fiberFragment,
        uniforms,
        // Les bandes sont extrudées à l'écran : selon leur sens, on les voit « de dos ».
        side: DoubleSide,
        // Rangées avec les objets opaques (dessinées en premier) : le rack 3D passe devant.
        transparent: false,
        depthTest: false,
        depthWrite: false,
        // Addition pure (ONE, ONE) : la couleur sort déjà multipliée par son intensité.
        blending: CustomBlending,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquation: AddEquation,
        toneMapped: false,
      }),
    [uniforms],
  )
  const dustMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: dustVertex,
        fragmentShader: dustFragment,
        uniforms,
        transparent: false,
        depthTest: false,
        depthWrite: false,
        // Addition pure (ONE, ONE) : la couleur sort déjà multipliée par son intensité.
        blending: CustomBlending,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquation: AddEquation,
        toneMapped: false,
      }),
    [uniforms],
  )

  // Le chemin se recalcule quand la page change de hauteur (polices, pins GSAP, redimensionnement).
  useEffect(() => {
    let timer = 0
    const rebuild = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (!buildSpine(spine, { width: window.innerWidth, height: window.innerHeight })) return
        texture.needsUpdate = true
        uniforms.uLength.value = spine.length
        uniforms.uVertexT.value = spine.vertexT
        if (!shared.ready) {
          shared.ready = true
          gsap.to(intro.current, { value: 1, duration: 3.2, ease: 'power2.out', delay: 0.2 })
        } else {
          // Scène recréée (mode calme coupé puis remis) : pas de nouvelle intro, tout est allumé.
          intro.current.value = 1
        }
      }, 120)
    }
    rebuild()
    const observer = new ResizeObserver(rebuild)
    observer.observe(document.body)
    ScrollTrigger.addEventListener('refresh', rebuild)
    void document.fonts?.ready.then(rebuild)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      ScrollTrigger.removeEventListener('refresh', rebuild)
    }
  }, [spine, texture, uniforms])

  useEffect(
    () => () => {
      fiberGeometry.dispose()
      dustGeometry.dispose()
      fiberMaterial.dispose()
      dustMaterial.dispose()
      texture.dispose()
    },
    [fiberGeometry, dustGeometry, fiberMaterial, dustMaterial, texture],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1)
    const scroll = window.scrollY
    const vh = size.height
    const k = WORLD_H / vh

    // Inertie légère : le ruban traîne un peu derrière le scroll rapide, puis se recale.
    const velocity = (scroll - lastScroll.current) / Math.max(dt, 0.001)
    lastScroll.current = scroll
    lift.current += (Math.max(-60, Math.min(60, velocity * 0.02)) - lift.current) * (1 - Math.exp(-4 * dt))

    // Caméra et uniforms passent par l'état de la frame et la ref du maillage (objets three mutables).
    const cam = state.camera as PerspectiveCamera
    const centerY = -(scroll + vh / 2 + lift.current) * k
    cam.position.x = 0
    cam.position.y = centerY
    cam.position.z = DISTANCE
    cam.lookAt(0, centerY, 0)

    visibleRange(spine, scroll - vh * 0.7, scroll + vh * 1.7, range.current)
    const material = mesh.current?.material as ShaderMaterial | undefined
    if (!material) return
    const u = material.uniforms as typeof uniforms
    u.uT0.value = range.current.t0
    u.uT1.value = range.current.t1
    u.uTime.value = state.clock.elapsedTime
    u.uDpr.value = dpr
    u.uRes.value[0] = size.width * dpr
    u.uRes.value[1] = size.height * dpr
    u.uIntro.value = intro.current.value
    u.uFlow.value += Math.abs(velocity) * 0.00002 * dt
    ribbonState.glitch = Math.max(0, ribbonState.glitch - dt * 1.1)
    u.uGlitch.value = ribbonState.glitch
    if (mesh.current) mesh.current.visible = range.current.any
  })

  return (
    <>
      <mesh ref={mesh} geometry={fiberGeometry} material={fiberMaterial} frustumCulled={false} renderOrder={-2} />
      <points geometry={dustGeometry} material={dustMaterial} frustumCulled={false} renderOrder={-1} />
    </>
  )
}

/** Boucle de rendu branchée sur gsap.ticker (après Lenis) au lieu du rAF de R3F. */
function Driver({ skip }: { skip: number }) {
  const canvas = useThree((s) => s.gl.domElement)
  useEffect(() => {
    let frame = 0
    const tick = () => {
      frame++
      if (skip > 1 && frame % skip !== 1) return
      // En frameloop « never », R3F prend le temps tel quel : on lui donne des secondes.
      advance(performance.now() / 1000)
      // Première image dessinée : le canvas apparaît en fondu par-dessus l'image statique.
      if (frame === 1) canvas.parentElement?.parentElement?.setAttribute('data-ready', 'true')
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [skip, canvas])
  return null
}

export default function Scene() {
  // null tant qu'on ne sait pas si un vrai GPU est là : rien de lourd n'est préparé avant.
  const [gpu, setGpu] = useState<boolean | null>(null)
  const quality = gpu ? HIGH : LOW
  return (
    <Canvas
      className="ribbon-canvas"
      // R3F impose position: relative sur son conteneur : on le replace en fond fixe.
      style={{ position: 'fixed', inset: 0, height: '100lvh', zIndex: 0, pointerEvents: 'none' }}
      flat
      frameloop="never"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, stencil: false, depth: false, powerPreference: 'high-performance' }}
      camera={{ fov: FOV, near: 0.1, far: 200, position: [0, 0, DISTANCE] }}
      onCreated={({ gl, setDpr }) => {
        gl.setClearColor('#050506', 1)
        // Rendu logiciel (SwiftShader, llvmpipe) : ruban allégé, sans rack ni bloom.
        const software = isSoftwareRenderer(gl.getContext())
        if (software) {
          setDpr(0.5)
          // Sans GPU, le flou CSS (backdrop-filter) coûte cher à chaque image : les feuilles CSS le remplacent.
          document.documentElement.dataset.render = 'software'
        }
        setGpu(!software)
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          markWebGLFailed()
        })
      }}
      aria-hidden="true"
      data-ribbon-canvas
    >
      {gpu === null ? null : (
        <>
          <Driver skip={quality.skip} />
          <Fibers quality={quality} />
          {gpu ? (
            <>
              <Rack />
              <EffectComposer multisampling={0} depthBuffer>
                <Bloom mipmapBlur intensity={1} luminanceThreshold={0.3} luminanceSmoothing={0.4} radius={0.66} levels={7} />
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                <Vignette offset={0.25} darkness={0.55} />
              </EffectComposer>
            </>
          ) : null}
        </>
      )}
    </Canvas>
  )
}
