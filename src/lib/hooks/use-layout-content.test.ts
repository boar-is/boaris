import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type {
  LayoutContent,
  LayoutValue,
} from '~/src/lib/model/revision/layout'
import { ensureDefined } from '~/src/lib/utils/ensure'
import { diffpatcher } from '../diffpatcher'
import { useLayoutContent } from './use-layout-content'

describe('useLayoutContent', () => {
  describe('4 changes (delta, skip, delta, skip)', () => {
    const contents: ReadonlyArray<LayoutContent> = [
      {},
      {
        main: {
          _id: '0',
          direction: 'v',
          content: [
            {
              _id: '0',
              content: {
                trackId: '0',
                basis: 1,
              },
              _tag: 'LayoutItem',
            },
          ],
          _tag: 'LayoutGroup',
        },
      },
      {
        main: {
          _id: '0',
          direction: 'v',
          content: [
            {
              _id: '0',
              content: {
                trackId: '1',
                basis: 1,
              },
              _tag: 'LayoutItem',
            },
          ],
          _tag: 'LayoutGroup',
        },
      },
    ] as const

    const value: LayoutValue = {
      changes: [
        {
          _id: '0',
          at: 0 / 4,
          value: {
            type: 'delta',
            delta: diffpatcher.diff(contents[0], contents[1]),
          },
        },
        {
          _id: '1',
          at: 1 / 4,
          value: {
            type: 'skip',
          },
        },
        {
          _id: '2',
          at: 2 / 4,
          value: {
            type: 'delta',
            delta: diffpatcher.diff(contents[1], contents[2]),
          },
        },
        {
          _id: '3',
          at: 3 / 4,
          value: {
            type: 'skip',
          },
        },
      ],
    }

    it.concurrent.each([
      [
        [0, 1, 2, 3],
        [1, 1, 2, 2],
      ],
      [
        [1, 3, 0, 1],
        [1, 2, 1, 1],
      ],
      [
        [3, 3, 3, 3],
        [2, 2, 2, 2],
      ],
      [
        [3, 0, 3, 0],
        [2, 1, 2, 1],
      ],
    ])(
      '%o -> %o',
      (headIndexes: Array<number>, contentIndexes: Array<number>) => {
        if (
          headIndexes.length > 0 &&
          headIndexes.length !== contentIndexes.length
        ) {
          throw new Error(
            'Head and content index arrays must be of the same length',
          )
        }

        const { result, rerender } = renderHook(
          ({ headIndex }) => useLayoutContent(value, headIndex),
          {
            initialProps: {
              headIndex: ensureDefined(headIndexes[0]),
            },
          },
        )
        expect(result.current).toEqual(
          contents[ensureDefined(contentIndexes[0])],
        )

        for (let i = 1; i < headIndexes.length; i++) {
          rerender({ headIndex: ensureDefined(headIndexes[i]) })
          expect(result.current).toEqual(
            contents[ensureDefined(contentIndexes[i])],
          )
        }
      },
    )
  })
})
