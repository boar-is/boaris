import type { EditorState } from '@tiptap/pm/state'
import { getWordRangeAtPos } from '~/lib/prosemirror/get-word-range-at-pos'

export const getSequentialWordRange =
  (state: EditorState) =>
  (prevRange: { start: number; end: number }) =>
  (position: number) => {
    if (position === 0) {
      return undefined
    }

    const nextRange = getWordRangeAtPos(state)(position)

    if (
      nextRange.start === prevRange?.start &&
      nextRange.end === prevRange?.end
    ) {
      return prevRange
    }
    return nextRange
  }
