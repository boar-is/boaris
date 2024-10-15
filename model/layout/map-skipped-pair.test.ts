import { describe, expect, it } from 'vitest'
import { toFixedNumber } from '~/utils/to-fixed-number'
import { mapSkippedPair } from './map-skipped-pair'

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
