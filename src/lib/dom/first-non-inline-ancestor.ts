const inlineElements = new Set(['code', 'span', 'strong', 'em', 'u', 's', 'a'])

export const firstNonInlineAncestor = (node: {
  parentElement: HTMLElement | null
}) => {
  let parentElement = node.parentElement

  while (inlineElements.has(parentElement?.tagName.toLowerCase() ?? '')) {
    parentElement = parentElement?.parentElement ?? null
  }

  return parentElement
}
