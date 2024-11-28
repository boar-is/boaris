import { useResizeObserver } from '@react-aria/utils'
import { type MutableRefObject, useRef } from 'react'

export const useContainerHeightSync = ({
  contentRef,
  factor = 1 / 100,
}: {
  contentRef: MutableRefObject<HTMLElement | null>
  factor?: number | undefined
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useResizeObserver({
    ref: contentRef,
    onResize: () => {
      // Without setTimeout, a strange empty error is shown
      setTimeout(() => {
        if (!(ref.current && contentRef.current)) {
          return
        }
        ref.current.style.height = `${contentRef.current.offsetHeight / factor}px`
      })
    },
  })

  return ref
}
