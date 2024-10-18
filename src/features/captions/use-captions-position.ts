import type { Editor } from '@tiptap/react'
import { type MotionValue, useTransform } from 'framer-motion'

export const useCaptionsPosition = (
  editor: Editor,
  progress: MotionValue<number>,
) =>
  useTransform(() => {
    const size = editor.state.doc.content.size - 1
    return Math.floor(size * progress.get())
  })
