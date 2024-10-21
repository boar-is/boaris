import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useSetAtom } from 'jotai/index'
import { useRef } from 'react'
import { usePlaybackProgressAtom } from './playback-progress-atom-provider'

export const usePlaybackProgressScrollSync = ({
  scrollableHeight,
}: { scrollableHeight: number | undefined }) => {
  const playbackProgressAtom = usePlaybackProgressAtom()
  const setPlaybackProgress = useSetAtom(playbackProgressAtom)

  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  useMotionValueEvent(
    scrollYProgress,
    'change',
    (progress) => scrollableHeight && setPlaybackProgress(progress),
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
