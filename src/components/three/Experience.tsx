'use client'

import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Component, type ReactNode, useEffect, useState } from 'react'
import { useIsDesktop } from '@/hooks/useMedia'
import { gsap } from '@/lib/gsap'
import { sceneState } from '@/lib/sceneState'
import { Particles } from './Particles'
import { isSoftwareRenderer, markWebGLFailed } from './webgl'

/**
 * frameloop="demand" : on ne redemande une image que si la scène est visible (séquence du Lab),
 * l'onglet affiché. Le reste du temps, le GPU ne fait rien.
 */
function Driver({ light }: { light: boolean }) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let frame = 0
    const tick = () => {
      // Rendu logiciel : une image sur trois suffit et laisse respirer le reste de la page.
      frame = (frame + 1) % (light ? 3 : 1)
      const active = sceneState.visible > 0 || sceneState.shown > 0
      if (frame === 0 && active && !document.hidden) invalidate()
    }
    const onPointer = (event: PointerEvent) => {
      sceneState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [invalidate, light])
  return null
}

/** Rendu explicite (priorité 1) : canvas transparent, le fond calme reste visible dessous. */
function Render() {
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera)
  }, 1)
  return null
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
  // Le type de GPU n'est connu qu'une fois le contexte créé : rien n'est monté avant.
  const [light, setLight] = useState<boolean | null>(null)
  const count = light ? 12288 : desktop ? 49152 : 16384
  const [fraction, setFraction] = useState(1)

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, desktop ? 1.75 : 1.5]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, stencil: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 60 }}
        style={{ pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          const soft = isSoftwareRenderer(gl.getContext())
          if (soft) gl.setPixelRatio(1)
          setLight(soft)
        }}
      >
        <Driver light={!!light} />
        <PerformanceMonitor flipflops={3} onDecline={() => setFraction(0.55)} onIncline={() => setFraction(1)} onFallback={() => setFraction(0.4)}>
          <AdaptiveDpr />
          {light === null ? null : <Particles count={count} fraction={fraction} />}
          <Render />
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
