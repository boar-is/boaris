import { expect, it } from 'vitest'
import { toFixedNumber } from '../number'

const mapSkippedPair = (
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

  return [mappedInputs, mappedOutputs]
}

it('should interpolate', () => {
  const digits = 5
  const toFixed = toFixedNumber()(digits)

  expect(mapSkippedPair([0, 0.25, 0.75], [true, false, true], digits)).toEqual([
    [0, 0.5, 0.5, 1].map(toFixed),
    [0, 0.25, 0.75, 1].map(toFixed),
  ])

  expect(
    mapSkippedPair(
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [false, true, false, true, false, false, true, false],
      digits,
    ),
  ).toEqual([
    [0, 0.4, 0.4, 0.6, 0.6, 1].map(toFixed),
    [0.1, 0.3, 0.4, 0.5, 0.7, 0.9].map(toFixed),
  ])

  expect(mapSkippedPair([0, 0.25, 0.75], [false, true, true], digits)).toEqual([
    [0, 2 / 3, 2 / 3, 1].map(toFixed),
    [0.25, 0.75, 0.75, 1].map(toFixed),
  ])

  expect(
    mapSkippedPair(
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [true, false, false, true, true, false, false, false],
      digits,
    ),
  ).toEqual([
    [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1].map(toFixed),
    [0, 0.1, 0.4, 0.5, 0.5, 0.6].map(toFixed),
  ])
})
