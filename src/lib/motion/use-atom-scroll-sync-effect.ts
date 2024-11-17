import { useResizeObserver } from '@react-aria/utils'
import { type PrimitiveAtom, useSetAtom } from 'jotai/index'
import { useMotionValueEvent, useScroll } from 'motion/react'
import type { MutableRefObject } from 'react'

export const useAtomScrollSyncEffect = ({
  progressAtom,
  targetRef,
}: {
  progressAtom: PrimitiveAtom<number>
  targetRef: MutableRefObject<HTMLElement | null>
}) => {
  const setPlaybackProgress = useSetAtom(progressAtom)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    setPlaybackProgress(progress),
  )
  /**
   * A hack to recalculate scrollYProgress
   * @see https://github.com/motiondivision/motion/issues/2718
   */
  useResizeObserver({
    ref: targetRef,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })
}
