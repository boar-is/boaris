'use client'

import {
  AnimatePresence,
  type UseInViewOptions,
  type Variants,
  useInView,
} from 'motion/react'
import { type ReactNode, useRef } from 'react'
import { motion } from './motion'

type MarginType = UseInViewOptions['margin']

interface BlurFadeProps {
  children: ReactNode
  className?: string | undefined
  variant?:
    | {
        hidden: { y: number }
        visible: { y: number }
      }
    | undefined
  duration?: number | undefined
  delay?: number | undefined
  yOffset?: number | undefined
  inView?: boolean | undefined
  inViewMargin?: MarginType | undefined
  blur?: string | undefined
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
