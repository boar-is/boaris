import { useResizeObserver } from '@react-aria/utils'
import { type RefObject, useState } from 'react'

export const useCaptionsScrollableHeight = ({
  contentRef,
  factor = 1 / 15,
}: {
  contentRef: RefObject<HTMLDivElement | null>
  factor?: number | undefined
}) => {
  const [scrollableHeight, setScrollableHeight] = useState<number | 'auto'>(
    'auto',
  )

  useResizeObserver({
    ref: contentRef,
    onResize: () => {
      if (!contentRef.current) {
        return
      }
      setScrollableHeight((contentRef.current.offsetHeight * 1) / factor)
    },
  })

  return scrollableHeight
}
