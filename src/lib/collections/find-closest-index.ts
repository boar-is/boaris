export const findClosestIndex = <T>(
  sortedArr: ReadonlyArray<T>,
  target: number,
  propFn: (t: T) => number,
) => {
  if (!sortedArr.length) {
    return undefined
  }

  let lowIndex = 0
  let highIndex = sortedArr.length - 1

  const low = propFn(sortedArr[lowIndex]!)

  if (target < low) {
    return undefined
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = propFn(sortedArr[midIndex]!)

    if (mid === target) {
      return midIndex
    }

    if (mid < target) {
      lowIndex = midIndex + 1
    } else {
      highIndex = midIndex - 1
    }
  }

  return highIndex
}
