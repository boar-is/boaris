import { Function } from 'effect'
import { describe, expect, it } from 'vitest'
import { findClosestIndex } from './find-closest-index'

describe.concurrent('match inputs to outputs', () => {
  it.concurrent.each([
    [[], 33, undefined],
    [
      [10, 20, 30, 40, 50],
      5,
      undefined, // the target is smaller than everything
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
      expectedIndex: number | undefined,
    ) => {
      expect(findClosestIndex(sortedArr, targetValue, Function.identity)).toBe(
        expectedIndex,
      )
    },
  )

  it('propFn', () => {
    const arr: Array<{ offset: number; value: string }> = [
      {
        offset: 0,
        value: 'h',
      },
      {
        offset: 0.2,
        value: 'he',
      },
      {
        offset: 0.4,
        value: 'hel',
      },
      {
        offset: 0.6,
        value: 'hell',
      },
      {
        offset: 0.8,
        value: 'hello',
      },
    ]
    expect(findClosestIndex(arr, 0.3, (it) => it.offset)).toBe(1)
  })
})
