import type { Editor } from '@tiptap/react'
import {
  type MotionValue,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { firstNonInlineAncestor } from '~/features/captions/first-non-inline-ancestor'

export const useCaptionsOffset = (
  editor: Editor,
  position: MotionValue<number>,
) => {
  const offsetTop = useTransform(() => {
    const { node, offset } = editor.view.domAtPos(position.get())

    if (!offset) {
      return undefined
    }

    const ancestor = firstNonInlineAncestor(node)

    if (
      (node as HTMLElement).classList?.contains('ProseMirror') ||
      ancestor!.classList?.contains('ProseMirror')
    ) {
      return undefined
    }

    return ancestor!.offsetTop
  })

  const offset = useMotionValue(0)

  const animationFrameId = useRef<number>()
  useMotionValueEvent(offsetTop, 'change', (offsetTopValue) => {
    animationFrameId.current && cancelAnimationFrame(animationFrameId.current)
    animationFrameId.current = requestAnimationFrame(() => {
      if (offsetTopValue !== undefined) {
        animate(offset, offsetTopValue * -1, {
          duration: 0.8,
        })
      }
    })
  })

  return offset
}
