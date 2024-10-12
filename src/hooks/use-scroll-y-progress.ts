import { useScroll } from 'framer-motion'
import type { MutableRefObject } from 'react'

export const useScrollYProgress = ({
  ref,
}: { ref: MutableRefObject<HTMLElement | null> }) => {
  // const { scrollY } = useScroll()
  // return useTransform(scrollY, (scrollYValue) => {
  //   const scrollableEl = ref.current
  //   if (!scrollableEl) {
  //     return null
  //   }
  //
  //   const relativeScrollY = scrollYValue - scrollableEl.offsetTop
  //   const progress = relativeScrollY / scrollableEl.offsetHeight
  //   return Math.max(0, Math.min(1, progress))
  // })
  return useScroll({ target: ref }).scrollYProgress
}
