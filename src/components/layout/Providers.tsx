'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import { type ReactNode, useEffect } from 'react'
import { useCalm } from '@/lib/calm'

const loadFeatures = () => import('./motion-features').then((mod) => mod.default)

export function Providers({ children }: { children: ReactNode }) {
  const calm = useCalm()
  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
  }, [])
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion={calm ? 'always' : 'user'}>{children}</MotionConfig>
    </LazyMotion>
  )
}
