export const getCenterToScrollElemTo = (
  scrollable: Element,
  element: Element,
) => {
  const scrollableRect = scrollable.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  return (
    scrollable.scrollTop +
    (elementRect.top - scrollableRect.top) -
    scrollable.clientHeight / 2 +
    elementRect.height / 2
  )
}
