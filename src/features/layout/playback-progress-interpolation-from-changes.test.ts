import { describe, expect, it } from 'vitest'
import { toFixed } from '~/lib/utils/to-fixed'
import { playbackProgressInterpolationFromChanges } from './playback-progress-interpolation-from-changes'

describe.concurrent('playbackProgressInterpolationFromChanges', () => {
  const digits = 5
  const toFixedDigits = toFixed(digits)

  it.concurrent.each<{
    changes: Parameters<typeof playbackProgressInterpolationFromChanges>[0]
    returns: ReturnType<typeof playbackProgressInterpolationFromChanges>
  }>([
    {
      changes: [],
      returns: { input: [], output: [] },
    },
    {
      changes: [
        { at: 0, value: true },
        { at: 0.25, value: false },
        { at: 0.75, value: true },
      ],
      returns: {
        input: [0, 0.5, 0.5, 1],
        output: [0, 0.25, 0.75, 1],
      },
    },
    {
      changes: [
        { at: 0, value: false },
        { at: 0.25, value: true },
        { at: 0.75, value: true },
      ],
      returns: {
        input: [0, 2 / 3, 2 / 3, 1],
        output: [0.25, 0.75, 0.75, 1],
      },
    },
    {
      changes: [
        { at: 0, value: false },
        { at: 0.1, value: true },
        { at: 0.3, value: false },
        { at: 0.4, value: true },
        { at: 0.5, value: false },
        { at: 0.6, value: false },
        { at: 0.7, value: true },
        { at: 0.9, value: false },
      ],
      returns: {
        input: [0, 0.4, 0.4, 0.6, 0.6, 1],
        output: [0.1, 0.3, 0.4, 0.5, 0.7, 0.9],
      },
    },
    {
      changes: [
        { at: 0, value: true },
        { at: 0.1, value: false },
        { at: 0.3, value: false },
        { at: 0.4, value: true },
        { at: 0.5, value: true },
        { at: 0.6, value: false },
        { at: 0.7, value: false },
        { at: 0.9, value: false },
      ],
      returns: {
        input: [0, 1 / 3, 1 / 3, 2 / 3, 2 / 3, 1],
        output: [0, 0.1, 0.4, 0.5, 0.5, 0.6],
      },
    },
  ])('$changes -> $returns', ({ changes, returns: { input, output } }) => {
    expect(playbackProgressInterpolationFromChanges(changes, digits)).toEqual({
      input: input.map(toFixedDigits),
      output: output.map(toFixedDigits),
    })
  })
})
