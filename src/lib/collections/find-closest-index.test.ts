import { Equal, Option, identity } from 'effect'
import { describe, expect, it } from 'vitest'
import { findClosestIndex } from './find-closest-index'

describe.concurrent('match inputs to outputs', () => {
  it.concurrent.each([
    [[], 33, Option.none()],
    [
      [10, 20, 30, 40, 50],
      5,
      Option.none(), // the target is smaller than everything
    ],
    [
      [10, 20, 30, 40, 50],
      10,
      Option.some(0), // index of 10
    ],
    [
      [10, 20, 30, 40, 50],
      33,
      Option.some(2), // index of 30
    ],
    [
      [10, 20, 30, 40, 50],
      29,
      Option.some(1), // index of 20
    ],
    [
      [10, 20, 30, 40, 50],
      99,
      Option.some(4), // index of 50
    ],
  ])(
    '%o + %d -> %d',
    (
      sortedArr: Array<number>,
      targetValue: number,
      expectedIndex: Option.Option<number>,
    ) => {
      expect(
        Equal.equals(
          findClosestIndex(sortedArr, targetValue, identity),
          expectedIndex,
        ),
      ).toBe(true)
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

    expect(
      Equal.equals(
        findClosestIndex(arr, 0.3, (it) => it.offset),
        Option.some(1),
      ),
    ).toBe(true)
  })
})
