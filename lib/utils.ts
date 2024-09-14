import { toFixedNumber } from '~/lib/number'

export const mapSkippedPair = (
  inputs: Array<number>,
  outputs: Array<boolean>,
  digits = 5,
) => {
  if (inputs.length !== outputs.length) {
    throw new Error('Inputs and output arrays must be of the same length')
  }

  let trueRatio = 0
  for (let i = 0; i < inputs.length; i++) {
    if (outputs[i] === false) {
      continue
    }

    const start = inputs[i]
    const end = inputs[i + 1]
    if (start === undefined) {
      throw new Error('Out of bounds')
    }

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixed = toFixedNumber()(digits)

  const mappedInputs: Array<number> = []
  const mappedOutputs: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < inputs.length; i++) {
    if (outputs[i] === false) {
      continue
    }

    const start = inputs[i]
    const end = inputs[i + 1] ?? 1
    if (start === undefined) {
      throw new Error('Out of bounds')
    }

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    mappedInputs.push(toFixed(startingRatio), toFixed(mappedInputEnd))
    mappedOutputs.push(toFixed(start), toFixed(end))

    startingRatio = mappedInputEnd
  }

  return [mappedInputs, mappedOutputs] as const
}

export const findClosestIndex = <T>(
  arr: Array<T>,
  target: number,
  propFn: (t: T) => number,
) => {
  if (!arr.length) {
    return null
  }

  let lowIndex = 0
  let highIndex = arr.length - 1

  const low = arr[lowIndex]

  if (low === undefined) {
    throw new Error('Out of bounds')
  }

  if (target < propFn(low)) {
    return null
  }

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2)

    const mid = arr[midIndex]

    if (mid === undefined) {
      throw new Error('Out of bounds')
    }

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
