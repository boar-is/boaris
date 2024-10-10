import { ensureDefined } from '~/utils/ensure-defined'

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

  const low = propFn(ensureDefined(sortedArr[lowIndex]))

  if (target < low) {
    return null
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = propFn(ensureDefined(sortedArr[midIndex]))

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
