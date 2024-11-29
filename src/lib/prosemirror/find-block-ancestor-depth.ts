import type { ResolvedPos } from '@tiptap/pm/model'

export const findBlockAncestorDepth = ($pos: ResolvedPos) => {
  let depth = $pos.depth

  while (depth > 0) {
    const node = $pos.node(depth)
    if (node.isBlock) {
      return depth
    }
    depth--
  }

  // If the top-level node is a block node (excluding the document node)
  const topNode = $pos.node(0)
  if (topNode.isBlock && topNode.type.name !== 'doc') {
    return 0
  }

  return undefined
}
