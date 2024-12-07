export const calculateTranslateYToCenter = (
  scrollableElement: HTMLElement,
  targetElement: HTMLElement,
): number => {
  const targetOffsetTop = targetElement.offsetTop

  // Calculate the midpoint of the scrollable element's visible area
  const scrollableMidpoint = scrollableElement.clientHeight / 2
  const targetMidpoint = targetElement.offsetHeight / 2

  // Determine the required translateY to center the element
  const requiredTranslateY =
    targetOffsetTop + targetMidpoint - scrollableMidpoint

  return requiredTranslateY
}
