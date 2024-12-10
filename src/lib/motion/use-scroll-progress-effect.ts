import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'motion/react'
import type { RefObject } from 'react'

export const useScrollProgressEffect = ({
  ref,
  onUpdate,
}: {
  ref: RefObject<HTMLElement | null>
  onUpdate: (progress: number) => void
}) => {
  const { scrollYProgress } = useScroll({
    target: ref,
  })

  useMotionValueEvent(scrollYProgress, 'change', onUpdate)
  /**
   * A hack to recalculate scrollYProgress
   * @see https://github.com/motiondivision/motion/issues/2718
   */
  useResizeObserver({
    ref,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })
}
