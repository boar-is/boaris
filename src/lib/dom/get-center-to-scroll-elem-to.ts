export const getCenterToScrollElemTo = (
  scrollable: HTMLElement,
  element: HTMLElement,
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
