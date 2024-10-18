import { Reactive, useObservable } from '@legendapp/state/react'
import { useResizeObserver } from '@react-aria/utils'
import type { RefObject } from 'react'
import { motion } from '~/lib/framer-motion/motion'

const ReactiveMotionDiv = Reactive(motion.div)

export const useCaptionsScrollableHeight$ = ({
  contentRef,
  factor = 1 / 15,
}: {
  contentRef: RefObject<HTMLDivElement | null>
  factor?: number | undefined
}) => {
  const scrollableHeight$ = useObservable<number | 'auto'>('auto')

  useResizeObserver({
    ref: contentRef,
    onResize: () => {
      if (!contentRef.current) {
        return
      }
      scrollableHeight$.set((contentRef.current.offsetHeight * 1) / factor)
    },
  })

  return scrollableHeight$
}
