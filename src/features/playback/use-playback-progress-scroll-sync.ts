import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { usePlaybackProgress$ } from '~/features/playback/playback-progress-provider'
import { headerHeight } from '~/lib/constants'

export const usePlaybackProgressScrollSync = () => {
  const playbackProgress$ = usePlaybackProgress$()

  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${headerHeight}px`, 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    playbackProgress$.set(progress),
  )
  /**
   * A hack to recalculate scrollYProgress
   * @see https://github.com/framer/motion/issues/2718
   */
  useResizeObserver({
    ref,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })

  return [ref] as const
}
