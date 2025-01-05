import type { EditorView } from '@uiw/react-codemirror'

export const scrollToSelection = (view: EditorView) => {
  const lineBlock = view.lineBlockAt(view.state.selection.main.head)

  const top = lineBlock.top
  const viewportHeight = view.scrollDOM.clientHeight
  const centeredOffsetY = top - viewportHeight / 2 + lineBlock.height / 2

  const selectionPos = view.coordsAtPos(view.state.selection.main.head)
  const viewportWidth = view.scrollDOM.clientWidth
  let centeredOffsetX = 0

  if (selectionPos) {
    const selectionCenter = (selectionPos.left + selectionPos.right) / 2
    centeredOffsetX = selectionCenter - viewportWidth / 2
  }

  view.scrollDOM.scrollTo({
    top: centeredOffsetY,
    left: centeredOffsetX,
    behavior: 'smooth',
  })
}
