import { expect, it } from 'vitest'

const mapSkippedPair = (inputs: Array<number>, outputs: Array<boolean>) => {
  if (inputs.length !== outputs.length) {
    throw new Error('Inputs and output arrays must be of the same length')
  }

  let trueRatio = 0
  for (let i = 0; i < inputs.length - 1; i++) {
    if (outputs[i] === false) {
      continue
    }

    const start = inputs[i]
    const end = inputs[i + 1]
    if (!(start && end)) {
      throw new Error('Out of bounds')
    }

    trueRatio += end - start
  }

  const multiplier = 1 / trueRatio

  const mappedInputs: Array<number> = []
  const mappedOutputs: Array<number> = []
  for (let i = 0; i < inputs.length - 1; i++) {
    const start = inputs[i]
    const end = inputs[i + 1]
    if (!(start && end)) {
      throw new Error('Out of bounds')
    }
  }

  return [mappedInputs, mappedOutputs]
}

it('should interpolate', () => {
  expect(mapSkippedPair([0, 0.25, 0.75], [true, false, true])).toEqual([
    [0, 0.5, 0.5, 1],
    [0, 0.25, 0.75, 1],
  ])

  expect(
    mapSkippedPair(
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [false, true, false, true, false, false, true, false],
    ),
  ).toEqual([
    [0, 0.4, 0.4, 0.6, 0.6, 1],
    [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
  ])

  expect(mapSkippedPair([0, 0.25, 0.75], [false, true, true])).toEqual([
    [0, 2 / 3, 2 / 3, 1],
    [0, 0.75, 0.75, 1],
  ])

  expect(
    mapSkippedPair(
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [true, false, false, true, true, false, false, false],
    ),
  ).toEqual([
    [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
    [0, 0.1, 0.4, 0.5, 0.5, 0.6],
  ])
})
