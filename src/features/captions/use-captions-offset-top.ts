import { animate, useMotionValue } from 'framer-motion'
import type { Atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useConstant } from '~/lib/react/use-constant'

export const useCaptionsOffsetTop = (editorOffsetTop$: Atom<number>) => {
  const offsetTop = useMotionValue(0)

  useMotionValue(
    useConstant(() =>
      atomEffect((get) => {
        const offset = get(editorOffsetTop$)
        if (offset !== undefined) {
          animate(offsetTop, offset * -1, {
            duration: 0.8,
          })
        }
      }),
    ),
  )

  return offsetTop
}
