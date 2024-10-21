import type { EditorView } from '@tiptap/pm/view'
import { firstNonInlineAncestor } from '~/lib/dom/first-non-inline-ancestor'

export const offsetTopAtPos = (view: EditorView, pos: number) => {
  const { node, offset } = view.domAtPos(pos)

  if (!offset) {
    return undefined
  }

  const ancestor = firstNonInlineAncestor(node)!

  if (
    (node as HTMLElement).classList?.contains('ProseMirror') ||
    ancestor.classList?.contains('ProseMirror')
  ) {
    return undefined
  }

  return ancestor.offsetTop
}
