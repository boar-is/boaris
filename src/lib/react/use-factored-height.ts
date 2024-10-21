import { useResizeObserver } from '@react-aria/utils'
import { type RefObject, useState } from 'react'

export const useFactoredHeight = (
  contentRef: RefObject<HTMLDivElement | null>,
  factor = 1 / 30,
) => {
  const [height, setHeight] = useState<number | undefined>()

  useResizeObserver({
    ref: contentRef,
    onResize: () => {
      if (!contentRef.current) {
        return
      }
      setHeight((contentRef.current.offsetHeight * 1) / factor)
    },
  })

  return height
}
