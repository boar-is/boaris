import { identity } from 'effect'
import { describe, expect, it } from 'vitest'
import { findClosestIndex } from './find-closest-index'

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
    '%o + %d -> %d',
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
