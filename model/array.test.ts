import { identity } from 'effect'
import { describe, expect, it } from 'vitest'
import { closestIndexOf } from './array'

describe.concurrent('array', () => {
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
        expect(closestIndexOf(sortedArr, targetValue, identity)).toBe(
          expectedIndex,
        )
      },
    )

    it('propFn', () => {
      const arr: Array<{ at: number; value: string }> = [
        {
          at: 0,
          value: 'h',
        },
        {
          at: 0.2,
          value: 'he',
        },
        {
          at: 0.4,
          value: 'hel',
        },
        {
          at: 0.6,
          value: 'hell',
        },
        {
          at: 0.8,
          value: 'hello',
        },
      ]
      expect(closestIndexOf(arr, 0.3, (it) => it.at)).toBe(1)
    })
  })
})
