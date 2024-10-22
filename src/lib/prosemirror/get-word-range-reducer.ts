import type { EditorState } from '@tiptap/pm/state'
import { getWordRangeAtPos } from '~/lib/prosemirror/get-word-range-at-pos'

export const getWordRangeReducer =
  (state: EditorState) =>
  (
    accumulator: { start: number; end: number } | undefined,
    position: number,
  ) => {
    if (position === 0) {
      return undefined
    }

    const nextRange = getWordRangeAtPos(state)(position)

    if (
      nextRange.start === accumulator?.start &&
      nextRange.end === accumulator?.end
    ) {
      return accumulator
    }
    return nextRange
  }
