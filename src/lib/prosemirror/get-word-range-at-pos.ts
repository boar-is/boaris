import type { EditorState } from '@tiptap/pm/state'

export const getWordRangeAtPos = (state: EditorState) => (position: number) => {
  const resolvedPos = state.doc.resolve(position)
  const node = resolvedPos.node(resolvedPos.depth)

  const textInNode = node.textBetween(0, node.content.size, '', '\0')

  const localPos = position - resolvedPos.start()

  let start = localPos
  while (start > 0 && /\S/.test(textInNode[start - 1]!)) {
    start--
  }

  let end = localPos
  while (end < textInNode.length && /\S/.test(textInNode[end]!)) {
    end++
  }

  return {
    start: start + resolvedPos.start(),
    end: end + resolvedPos.start(),
  }
}
