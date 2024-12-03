import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'motion/react'
import type { MutableRefObject } from 'react'

export const useScrollProgressEffect = ({
  targetRef,
  onUpdate,
}: {
  targetRef: MutableRefObject<HTMLElement | null>
  onUpdate: (progress: number) => void
}) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  useMotionValueEvent(scrollYProgress, 'change', onUpdate)
  /**
   * A hack to recalculate scrollYProgress
   * @see https://github.com/motiondivision/motion/issues/2718
   */
  useResizeObserver({
    ref: targetRef,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })
}
