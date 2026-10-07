'use client'

import { useCalm } from '@/lib/calm'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { sceneState } from '@/lib/sceneState'

/**
 * Chorégraphie de la scène 3D. Chaque chapitre est un ScrollTrigger sans animation ;
 * une seule fonction lit leurs progressions (toujours exactes : 0 avant, 1 après) et écrit sceneState.
 * Plusieurs tweens sur la même propriété se marcheraient dessus au recalcul : ici, aucun conflit possible.
 * Le lissage (l'équivalent du scrub) est fait dans useFrame. La séquence du Lab vit dans LabSequence.
 */
export function SceneDirector() {
  const calm = useCalm()

  useGSAP(
    () => {
      if (calm) return
      const range = (trigger: string, start: string, end: string) => ScrollTrigger.create({ trigger, start, end })
      const t = {
        about: range('#a-propos', 'top bottom', 'top 25%'),
        square: range('#a-propos', 'top 25%', 'bottom 60%'),
        interests: range('#interets', 'top bottom', 'top 20%'),
        lab: range('#lab', 'top bottom', 'top top'),
        dimIn: range('#parcours', 'top 85%', 'top 25%'),
        dimOut: range('#reseaux', 'top bottom', 'top 35%'),
        contact: range('#reseaux', 'top bottom', 'top 20%'),
      }
      const desktop = window.matchMedia('(min-width: 1024px)')

      const update = () => {
        const s = sceneState
        // 0 noyau → 1 onde → 2 circuit → 3 rack → 4 portail
        s.progress = t.about.progress + t.interests.progress + t.lab.progress + t.contact.progress
        s.square = t.square.progress
        s.dim = t.dimIn.progress * (1 - t.dimOut.progress)
        // Desktop : le rack légèrement à droite pour laisser la place aux étapes du Lab.
        s.offsetX = desktop.matches ? 0.75 * t.lab.progress * (1 - t.contact.progress) : 0
      }

      const driver = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update })
      ScrollTrigger.addEventListener('refresh', update)
      update()
      return () => {
        ScrollTrigger.removeEventListener('refresh', update)
        driver.kill()
      }
    },
    { dependencies: [calm], revertOnUpdate: true },
  )

  return null
}
