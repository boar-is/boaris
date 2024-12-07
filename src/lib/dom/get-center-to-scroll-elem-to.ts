export const getCenterToScrollElemTo = (
  scrollableElement: Element,
  targetElement: Element,
) => {
  const scrollableRect = scrollableElement.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()

  // Distance from the top of the scrollable container to the target element
  const targetRelativeTop = targetRect.top - scrollableRect.top

  // Midpoint of the scrollable container and target element
  const scrollableMidpoint = scrollableElement.clientHeight / 2
  const targetMidpoint = targetRect.height / 2

  // Calculate the center position to scroll to
  const centerScrollTop =
    scrollableElement.scrollTop +
    targetRelativeTop -
    scrollableMidpoint +
    targetMidpoint

  return centerScrollTop
}
