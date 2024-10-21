import type { EditorState } from '@tiptap/pm/state'
import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { getWordRangeAtPos } from '~/lib/prosemirror/get-word-range-at-post'

const initialRange = { start: 0, end: 0 }

export const useCaptionsWordRange = (
  state: EditorState,
  position: MotionValue<number>,
) => {
  const range = useMotionValue<{ start: number; end: number } | undefined>(
    initialRange,
  )

  useTransform(() => {
    return getWordRangeAtPos(state, position.get())
  })

  useMotionValueEvent(position, 'change', (it) => {
    if (!it) {
      range.set(undefined)
      return
    }

    const nextRange = getWordRangeAtPos(state, it)
    const prevRange = range.get()

    if (
      nextRange.start !== prevRange?.start &&
      nextRange.end !== prevRange?.end
    ) {
      range.set(nextRange)
    }
  })

  return range
}
