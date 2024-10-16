// TODO refactor this and everything else to return undefined not null
export const findClosestIndex = <T>(
  sortedArr: Array<T>,
  target: number,
  propFn: (t: T) => number,
) => {
  if (!sortedArr.length) {
    return null
  }

  let lowIndex = 0
  let highIndex = sortedArr.length - 1

  const low = propFn(sortedArr[lowIndex]!)

  if (target < low) {
    return null
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
