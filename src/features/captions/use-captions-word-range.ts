import type { EditorState } from '@tiptap/pm/state'
import { type MotionValue, useTransform } from 'framer-motion'
import { getWordRangeAtPos } from '~/lib/text-editor/get-word-range-at-post'

export const useCaptionsWordRange = (
  state: EditorState,
  position: MotionValue<number>,
) =>
  useTransform(() => {
    return getWordRangeAtPos(state, position.get())
  })
