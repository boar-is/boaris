import { useResizeObserver } from '@react-aria/utils'
import { useSetAtom } from 'jotai/index'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef } from 'react'
import { usePlaybackProgressAtom } from './playback-progress-atom-context'

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
   * @see https://github.com/motiondivision/motion/issues/2718
   */
  useResizeObserver({
    ref,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })

  return [ref] as const
}
