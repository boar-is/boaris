import { identity } from 'effect'
import { describe, expect, it } from 'vitest'
import { toFixedNumber } from '~/lib/number'
import { findClosestIndex, mapSkippedPair } from './utils'

describe.concurrent('mapSkippedPair', () => {
  const digits = 5
  const toFixed = toFixedNumber()(digits)

  it.concurrent.each([
    [
      [0, 0.25, 0.75],
      [true, false, true],
      [0, 0.5, 0.5, 1],
      [0, 0.25, 0.75, 1],
    ],
    [
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [false, true, false, true, false, false, true, false],
      [0, 0.4, 0.4, 0.6, 0.6, 1],
      [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
    ],
    [
      [0, 0.25, 0.75],
      [false, true, true],
      [0, 2 / 3, 2 / 3, 1],
      [0.25, 0.75, 0.75, 1],
    ],
    [
      [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
      [true, false, false, true, true, false, false, false],
      [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
      [0, 0.1, 0.4, 0.5, 0.5, 0.6],
    ],
    [[], [], [], []],
  ])(
    'should interpolate (%o, %o) -> (%o, %o)',
    (
      inputs: Array<number>,
      outputs: Array<boolean>,
      mappedInputs: Array<number>,
      mappedOutputs: Array<number>,
    ) => {
      expect(mapSkippedPair(inputs, outputs, digits)).toEqual([
        mappedInputs.map(toFixed),
        mappedOutputs.map(toFixed),
      ])
    },
  )

  it('should throw if input and output arrays have different length', () => {
    expect(() => mapSkippedPair([0], [true, true], digits)).toThrow()
  })
})

describe.concurrent('findClosestIndex', () => {
  it.concurrent.each([
    [[], 33, null],
    [
      [10, 20, 30, 40, 50],
      5,
      null, // the target is smaller than all
    ],
    [
      [10, 20, 30, 40, 50],
      10,
      0, // index of 10
    ],
    [
      [10, 20, 30, 40, 50],
      33,
      2, // index of 30
    ],
    [
      [10, 20, 30, 40, 50],
      29,
      1, // index of 20
    ],
    [
      [10, 20, 30, 40, 50],
      99,
      4, // index of 50
    ],
  ])(
    '%o -> %d',
    (
      sortedArr: Array<number>,
      targetValue: number,
      expectedIndex: number | null,
    ) => {
      expect(findClosestIndex(sortedArr, targetValue, identity)).toBe(
        expectedIndex,
      )
    },
  )
})
