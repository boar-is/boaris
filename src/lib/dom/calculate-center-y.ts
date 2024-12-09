export const calculateCenterY = (
  containerElement: HTMLElement,
  targetElement: HTMLElement,
) => {
  const targetTop = targetElement.offsetTop
  const targetHeight = targetElement.offsetHeight

  const containerStyle = getComputedStyle(containerElement)
  const containerHeight =
    containerElement.offsetHeight -
    Number.parseFloat(containerStyle.paddingTop) -
    Number.parseFloat(containerStyle.paddingBottom)

  const adjustmentY =
    targetHeight < containerHeight * 0.35 ? containerHeight * 0.15 : 0

  return containerHeight / 2 - targetHeight / 2 - targetTop - adjustmentY
}
