import { describe, expect, it } from 'vitest'
import { toFixedNumber } from '~/lib/number'
import { mapSkippedPair } from './utils'

describe('mapSkippedPair', () => {
  const digits = 5
  const toFixed = toFixedNumber()(digits)

  it('should interpolate the example 1', () => {
    expect(
      mapSkippedPair([0, 0.25, 0.75], [true, false, true], digits),
    ).toEqual([[0, 0.5, 0.5, 1].map(toFixed), [0, 0.25, 0.75, 1].map(toFixed)])
  })

  it('should interpolate the example 2', () => {
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
  })

  it('should interpolate the example 3', () => {
    expect(
      mapSkippedPair([0, 0.25, 0.75], [false, true, true], digits),
    ).toEqual([
      [0, 2 / 3, 2 / 3, 1].map(toFixed),
      [0.25, 0.75, 0.75, 1].map(toFixed),
    ])
  })

  it('should interpolate the example 4', () => {
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

  it('should return empty arrays for empty arrays', () => {
    expect(mapSkippedPair([], [], digits)).toEqual([
      [].map(toFixed),
      [].map(toFixed),
    ])
  })

  it('should throw if input and output arrays have different length', () => {
    expect(() => mapSkippedPair([0], [true, true], digits)).toThrow()
  })
})
