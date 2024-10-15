import { ensuredDefined } from './unknown'

export const closestIndexOf = <T>(
  sortedArr: Array<T>,
  target: number,
  propFn: (t: T) => number,
) => {
  if (!sortedArr.length) {
    return null
  }

  let lowIndex = 0
  let highIndex = sortedArr.length - 1

  const low = propFn(ensuredDefined(sortedArr[lowIndex]))

  if (target < low) {
    return null
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = propFn(ensuredDefined(sortedArr[midIndex]))

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

export const forcedGroupedBy = <T, K extends string | number>(
  array: Array<T>,
  keyFn: (item: T) => K,
) =>
  array.reduce(
    (acc, cur) => {
      acc[keyFn(cur)] = cur
      return acc
    },
    {} as Record<K, T>,
  )
