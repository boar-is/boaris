import { ensureDefined } from './ensure'

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

  const low = ensureDefined(sortedArr[lowIndex])

  if (target < propFn(low)) {
    return null
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = ensureDefined(sortedArr[midIndex])

    if (mid === target) {
      return midIndex
    }

    if (propFn(mid) < target) {
      lowIndex = midIndex + 1
    } else {
      highIndex = midIndex - 1
    }
  }

  return highIndex
}
