import type { EditorState } from '@tiptap/pm/state'

export const getPositionByProgress =
  (state: EditorState) => (progress: number) => {
    const size = state.doc.content.size - 1
    return Math.floor(size * progress)
  }
