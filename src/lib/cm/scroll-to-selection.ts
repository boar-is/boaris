import type { EditorView } from '@uiw/react-codemirror'

export const scrollToSelection = (view: EditorView) => {
  const { anchor, head } = view.state.selection.main

  const anchorCoords = view.coordsAtPos(anchor)
  const headCoords = view.coordsAtPos(head)

  if (!(anchorCoords && headCoords)) {
    return
  }

  const { scrollDOM } = view

  const top = Math.min(anchorCoords.top, headCoords.top)
  const bottom = Math.max(anchorCoords.bottom, headCoords.bottom)
  const left = Math.min(anchorCoords.left, headCoords.left)
  const right = Math.max(anchorCoords.right, headCoords.right)

  const scrollRect = scrollDOM.getBoundingClientRect()

  const scrollTopOffset =
    top -
    scrollRect.top +
    scrollDOM.scrollTop -
    scrollDOM.clientHeight / 2 +
    (bottom - top) / 2

  const scrollLeftOffset =
    anchorCoords.left === headCoords.left &&
    anchorCoords.left < scrollDOM.clientWidth
      ? 0
      : left -
        scrollRect.left +
        scrollDOM.scrollLeft -
        scrollDOM.clientWidth / 2 +
        (right - left) / 2

  scrollDOM.scrollTo({
    top: scrollTopOffset,
    left: scrollLeftOffset,
    behavior: 'smooth',
  })
}
