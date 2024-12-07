export const getCenterToScrollElemTo = (
  scrollableElement: Element,
  targetElement: Element,
) => {
  const scrollableRect = scrollableElement.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()

  // Calculate the top offset of the target element relative to the scrollable element
  const targetRelativeTop = targetRect.top - scrollableRect.top

  // Calculate the midpoint of the scrollable element's visible area
  const scrollableMidpoint = scrollableElement.clientHeight / 2

  // Calculate the midpoint of the target element
  const targetMidpoint = targetRect.height / 2

  // Calculate the vertical scroll position needed to center the target element
  const centerScrollTop =
    targetRelativeTop + targetMidpoint - scrollableMidpoint

  return centerScrollTop
}
