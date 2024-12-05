export const getCenterToScrollElemTo = (
  scrollable: Element,
  element: Element,
) => {
  const scrollableRect = scrollable.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  // Distance from the top of the scrollable container to the element
  const elementOffsetTop = elementRect.top - scrollableRect.top

  // Calculate the center position to scroll to
  const centerScrollTop =
    scrollable.scrollTop +
    elementOffsetTop -
    scrollable.clientHeight / 2 +
    elementRect.height / 2

  console.log(elementRect)

  return centerScrollTop
}
