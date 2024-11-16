'use client'

import { LazyMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'

const loadFeatures = () => import('./features').then((m) => m.default)

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
