export const calculateCenterY = (
  containerElement: HTMLElement,
  targetElement: HTMLElement,
): number => {
  const targetStyle = getComputedStyle(targetElement)
  const targetMarginTop = Number.parseFloat(targetStyle.marginTop)
  const targetTop = targetElement.offsetTop + targetMarginTop
  const targetHeight = targetElement.clientHeight

  const containerHeight = containerElement.clientHeight

  const ans = -targetHeight - targetTop + containerHeight / 2

  console.log({
    containerHeight,
    targetHeight,
    targetTop,
    ans,
  })

  return ans
}
