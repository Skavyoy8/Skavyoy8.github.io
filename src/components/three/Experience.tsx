'use client'

import { AdaptiveDpr, PerformanceMonitor, View } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Component, type ReactNode, useEffect, useState } from 'react'
import { useIsDesktop, useIsTouch } from '@/hooks/useMedia'
import { gsap } from '@/lib/gsap'
import { sceneState } from '@/lib/sceneState'
import { Particles } from './Particles'
import { isSoftwareRenderer, markWebGLFailed } from './webgl'

/** frameloop="demand" : on redemande une image à chaque tick GSAP, sauf onglet caché ou scène recouverte. */
function Driver({ light }: { light: boolean }) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let covered = false
    let frame = 0
    const footer = document.querySelector('.footer-reveal')
    const observer = new IntersectionObserver(([entry]) => {
      covered = (entry?.intersectionRatio ?? 0) > 0.98
    }, { threshold: [0, 0.98, 1] })
    if (footer) observer.observe(footer)
    const tick = () => {
      // Rendu logiciel : une image sur trois suffit et laisse respirer le reste de la page.
      frame = (frame + 1) % (light ? 3 : 1)
      if (frame === 0 && !document.hidden && !covered) invalidate()
    }
    // Pointeur suivi ici plutôt que via R3F : la View du badge accapare les événements de R3F.
    const onPointer = (event: PointerEvent) => {
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onPointer)
      observer.disconnect()
    }
  }, [invalidate, light])
  return null
}

/**
 * drei View règle le viewport sur son rectangle sans le restaurer : on remet le plein écran
 * avant le rendu principal (post-process ou rendu simple), sinon la scène ne s'affiche que dans le badge.
 */
function ViewportReset() {
  useFrame(({ gl, size }) => {
    gl.setScissorTest(false)
    gl.setViewport(0, 0, size.width, size.height)
  }, 0.5)
  return null
}

/** Rendu de la scène principale quand le post-process est coupé (drei View désactive le rendu auto). */
function PlainRender() {
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera)
  }, 1)
  return null
}

function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.16} luminanceSmoothing={0.3} radius={0.72} />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.4} />
      <Vignette offset={0.24} darkness={0.8} />
    </EffectComposer>
  )
}

/** Si le contexte WebGL ne peut pas être créé, on bascule sur le fallback au lieu de casser la page. */
class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    markWebGLFailed()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Experience() {
  return (
    <WebGLBoundary>
      <Scene />
    </WebGLBoundary>
  )
}

function Scene() {
  const desktop = useIsDesktop()
  const touch = useIsTouch()
  // Le type de GPU n'est connu qu'une fois le contexte créé : rien n'est monté avant.
  const [light, setLight] = useState<boolean | null>(null)
  const count = light ? 12288 : desktop ? 65536 : 16384
  const [effectsAllowed, setEffectsAllowed] = useState(true)
  const effects = effectsAllowed && light === false && desktop && !touch
  const [fraction, setFraction] = useState(1)

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, desktop ? 1.75 : 1.5]}
        frameloop="demand"
        gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
        style={{ pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          const soft = isSoftwareRenderer(gl.getContext())
          if (soft) gl.setPixelRatio(1)
          setLight(soft)
        }}
      >
        <color attach="background" args={['#050506']} />
        <Driver light={!!light} />
        <ViewportReset />
        <PerformanceMonitor
          flipflops={3}
          onDecline={() => {
            setEffectsAllowed(false)
            setFraction(0.55)
          }}
          onIncline={() => setFraction(1)}
          onFallback={() => {
            setEffectsAllowed(false)
            setFraction(0.4)
          }}
        >
          <AdaptiveDpr />
          {light === null ? null : <Particles count={count} fraction={fraction} />}
          {effects ? <Effects /> : <PlainRender />}
        </PerformanceMonitor>
        <View.Port />
      </Canvas>
    </div>
  )
}
