import type { EditorView } from '@tiptap/pm/view'
import {
  type MotionValue,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { offsetTopAtPos } from '~/lib/prosemirror/offset-top-at-pos'

export const useCaptionsOffsetTop = (
  view: EditorView,
  position: MotionValue<number>,
) => {
  const ancestorTop = useTransform(() => {
    offsetTopAtPos(view, position.get())
  })

  const offset = useMotionValue(0)
  useMotionValueEvent(ancestorTop, 'change', (offsetTopValue) => {
    if (offsetTopValue !== undefined) {
      animate(offset, offsetTopValue * -1, {
        duration: 0.8,
      })
    }
  })
  return offset
}
