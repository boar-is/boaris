'use client'

import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { useWorkspaceProjectPostContext } from './context'

export function WorkspaceProjectClientPage() {
  const state$ = useWorkspaceProjectPostContext()

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({ target: scrollableRef })
  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    state$.scrollYProgress.set(progress ?? 0),
  )
  useResizeObserver({
    ref: scrollableRef,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })

  const { width } = useWindowSize({
    debounceDelay: 250,
  })
  useEffect(() => state$.windowWidth.set(width), [state$, width])

  return <>aa</>
}
