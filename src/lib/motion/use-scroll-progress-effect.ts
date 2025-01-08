import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'motion/react'
import type { RefObject } from 'react'
import { useManualScrollRestoration } from '~/lib/react/use-manual-scroll-restoration'

export const useScrollProgressEffect = ({
  ref,
  onUpdate,
}: {
  ref: RefObject<HTMLElement | null>
  onUpdate: (progress: number) => void
}) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end end'],
  })

  useManualScrollRestoration()

  useMotionValueEvent(scrollYProgress, 'change', onUpdate)
  /**
   * A hack to recalculate scrollYProgress
   * @see https://github.com/motiondivision/motion/issues/2718
   */
  useResizeObserver({
    ref,
    onResize: () => window.scrollBy({ top: 1 }),
  })
}
