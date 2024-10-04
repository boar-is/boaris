'use client'

import { LazyMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

const loadFeatures = () =>
  import('~/src/lib/framer-motion/features').then((m) => m.default)

export function FramerMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
