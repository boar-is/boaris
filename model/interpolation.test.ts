import { describe, expect, it } from 'vitest'
import { remappedFalsyOutput } from './interpolation'
import { toFixed } from './number'

describe.concurrent('interpolation', () => {
  describe.concurrent('remappedFalsyOutput', () => {
    const digits = 5
    const toFixedDigits = toFixed(digits)

    it.concurrent.each<{
      interpolation: Parameters<typeof remappedFalsyOutput>[0]
      returns: ReturnType<typeof remappedFalsyOutput>
    }>([
      {
        interpolation: { input: [], output: [] },
        returns: { input: [], output: [] },
      },
      {
        interpolation: { input: [0, 0.25, 0.75], output: [true, false, true] },
        returns: { input: [0, 0.5, 0.5, 1], output: [0, 0.25, 0.75, 1] },
      },
      {
        interpolation: { input: [0, 0.25, 0.75], output: [false, true, true] },
        returns: { input: [0, 2 / 3, 2 / 3, 1], output: [0.25, 0.75, 0.75, 1] },
      },
      {
        interpolation: {
          input: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
          output: [false, true, false, true, false, false, true, false],
        },
        returns: {
          input: [0, 0.4, 0.4, 0.6, 0.6, 1],
          output: [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
        },
      },
      {
        interpolation: {
          input: [0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9],
          output: [true, false, false, true, true, false, false, false],
        },
        returns: {
          input: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
          output: [0, 0.1, 0.4, 0.5, 0.5, 0.6],
        },
      },
    ])(
      '$interpolation -> $returns',
      ({ interpolation, returns: { input, output } }) => {
        expect(remappedFalsyOutput(interpolation, digits)).toEqual({
          input: input.map(toFixedDigits),
          output: output.map(toFixedDigits),
        })
      },
    )
  })
})
