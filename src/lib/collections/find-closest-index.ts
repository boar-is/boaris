import { Option } from 'effect'

export const findClosestIndex = <T>(
  sortedArr: ReadonlyArray<T>,
  target: number,
  propFn: (t: T) => number,
): Option.Option<number> => {
  if (!sortedArr.length) {
    return Option.none()
  }

  let lowIndex = 0
  let highIndex = sortedArr.length - 1

  const low = propFn(sortedArr[lowIndex]!)

  if (target < low) {
    return Option.none()
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = propFn(sortedArr[midIndex]!)

    if (mid === target) {
      return Option.some(midIndex)
    }

    if (mid < target) {
      lowIndex = midIndex + 1
    } else {
      highIndex = midIndex - 1
    }
  }

  return Option.some(highIndex)
}
