import type { EditorState } from '@tiptap/pm/state'
import { type MotionValue, useTransform } from 'framer-motion'

export const useCaptionsPosition = (
  state: EditorState,
  progress: MotionValue<number>,
) =>
  useTransform(() => {
    const size = state.doc.content.size - 1
    return Math.floor(size * progress.get())
  })
