import { describe, expect, it } from 'vitest'
import { toFixed } from '~/lib/utils/to-fixed'
import { layoutProgressInterpolationFromChanges } from '~/model/layoutChange'

describe.concurrent('layoutProgressInterpolationFromChanges', () => {
  const digits = 5
  const toFixedDigits = toFixed(digits)

  it.concurrent.each<{
    changes: Parameters<typeof layoutProgressInterpolationFromChanges>[0]
    returns: ReturnType<typeof layoutProgressInterpolationFromChanges>
  }>([
    {
      changes: [],
      returns: { input: [0, 1], output: [0, 1] },
    },
    {
      changes: [
        { offset: 0, value: true },
        { offset: 0.25 },
        { offset: 0.75, value: true },
      ],
      returns: {
        input: [0, 0.5, 0.5, 1],
        output: [0, 0.25, 0.75, 1],
      },
    },
    {
      changes: [
        { offset: 0 },
        { offset: 0.25, value: true },
        { offset: 0.75, value: true },
      ],
      returns: {
        input: [0, 2 / 3, 2 / 3, 1],
        output: [0.25, 0.75, 0.75, 1],
      },
    },
    {
      changes: [
        { offset: 0 },
        { offset: 0.1, value: true },
        { offset: 0.3 },
        { offset: 0.4, value: true },
        { offset: 0.5 },
        { offset: 0.6 },
        { offset: 0.7, value: true },
        { offset: 0.9 },
      ],
      returns: {
        input: [0, 0.4, 0.4, 0.6, 0.6, 1],
        output: [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
      },
    },
    {
      changes: [
        { offset: 0, value: true },
        { offset: 0.1 },
        { offset: 0.3 },
        { offset: 0.4, value: true },
        { offset: 0.5, value: true },
        { offset: 0.6 },
        { offset: 0.7 },
        { offset: 0.9 },
      ],
      returns: {
        input: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
        output: [0, 0.1, 0.4, 0.5, 0.5, 0.6],
      },
    },
  ])('$changes -> $returns', ({ changes, returns: { input, output } }) => {
    expect(layoutProgressInterpolationFromChanges(changes, digits)).toEqual({
      input: input.map(toFixedDigits),
      output: output.map(toFixedDigits),
    })
  })
})
