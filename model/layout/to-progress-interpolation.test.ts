import { describe, expect, it } from 'vitest'
import { toProgressInterpolation } from '~/model/layout/to-progress-interpolation'
import { toFixedNumber } from '~/model/number/to-fixed-number'

describe.concurrent('toProgressInterpolation', () => {
  const digits = 5
  const toFixed = toFixedNumber()(digits)

  it.concurrent.each<{
    params: Parameters<typeof toProgressInterpolation>
    returns: ReturnType<typeof toProgressInterpolation>
  }>([
    {
      params: [
        [
          { at: 0, value: true },
          { at: 0.25, value: false },
          { at: 0.75, value: true },
        ],
      ],
      returns: {
        input: [0, 0.5, 0.5, 1],
        output: [0, 0.25, 0.75, 1],
      },
    },
    {
      params: [
        [
          { at: 0, value: false },
          { at: 0.1, value: true },
          { at: 0.3, value: false },
          { at: 0.4, value: true },
          { at: 0.5, value: false },
          { at: 0.6, value: false },
          { at: 0.7, value: true },
          { at: 0.9, value: false },
        ],
      ],
      returns: {
        input: [0, 0.4, 0.4, 0.6, 0.6, 1],
        output: [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
      },
    },
    {
      params: [
        [
          { at: 0, value: false },
          { at: 0.25, value: true },
          { at: 0.75, value: true },
        ],
      ],
      returns: {
        input: [0, 2 / 3, 2 / 3, 1],
        output: [0.25, 0.75, 0.75, 1],
      },
    },
    {
      params: [
        [
          { at: 0, value: true },
          { at: 0.1, value: false },
          { at: 0.3, value: false },
          { at: 0.4, value: true },
          { at: 0.5, value: true },
          { at: 0.6, value: false },
          { at: 0.7, value: false },
          { at: 0.9, value: false },
        ],
      ],
      returns: {
        input: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
        output: [0, 0.1, 0.4, 0.5, 0.5, 0.6],
      },
    },
    {
      params: [[]],
      returns: {
        input: [],
        output: [],
      },
    },
  ])('$params -> $returns', ({ params, returns: { input, output } }) => {
    expect(toProgressInterpolation(params[0], digits)).toEqual({
      input: input.map(toFixed),
      output: output.map(toFixed),
    })
  })
})
