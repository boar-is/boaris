import { describe, expect, it } from 'vitest'
import { diffpatcher } from '~/lib/diffpatcher'
import type { LayoutContent, LayoutValue } from '~/lib/model/revision/layout'
import { ensureDefined } from './ensure'
import { patchLayoutContent } from './patch-layout-content'

describe('patchLayoutContent', () => {
  describe('6 changes (skip, delta, skip, delta, skip, delta)', () => {
    const contents: ReadonlyArray<LayoutContent> = [
      {},
      {
        main: {
          _id: '0',
          direction: 'h',
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
          direction: 'h',
          content: [
            {
              _id: '0',
              content: {
                trackId: '0',
                basis: 1,
              },
              _tag: 'LayoutItem',
            },
            {
              _id: '1',
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
      {
        main: {
          _id: '0',
          direction: 'h',
          content: [
            {
              _id: '0',
              content: {
                trackId: '0',
                basis: 1,
              },
              _tag: 'LayoutItem',
            },
            {
              _id: '1',
              content: {
                trackId: '1',
                basis: 1,
              },
              _tag: 'LayoutItem',
            },
            {
              _id: '2',
              content: {
                trackId: '2',
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
          at: 0 / 6,
          value: {
            type: 'skip',
          },
        },
        {
          _id: '1',
          at: 1 / 6,
          value: {
            type: 'delta',
            delta: diffpatcher.diff(contents[0], contents[1]),
          },
        },
        {
          _id: '2',
          at: 2 / 6,
          value: {
            type: 'skip',
          },
        },
        {
          _id: '3',
          at: 3 / 6,
          value: {
            type: 'delta',
            delta: diffpatcher.diff(contents[1], contents[2]),
          },
        },
        {
          _id: '4',
          at: 4 / 6,
          value: {
            type: 'skip',
          },
        },
        {
          _id: '5',
          at: 5 / 6,
          value: {
            type: 'delta',
            delta: diffpatcher.diff(contents[2], contents[3]),
          },
        },
      ],
    }

    it.concurrent.each([
      // Forward
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 2, 0, 1],
      [0, 3, 0, 2],
      [0, 4, 0, 2],
      [0, 5, 0, 3],
      // Reverse
      [5, 5, 3, 3],
      [5, 4, 3, 2],
      [5, 3, 3, 2],
      [5, 2, 3, 1],
      [5, 1, 3, 1],
      [5, 0, 3, 0],
      // Middle
      [3, 0, 2, 0],
      [3, 1, 2, 1],
      [3, 2, 2, 1],
      [3, 3, 2, 2],
      [3, 4, 2, 2],
      [3, 5, 2, 3],
    ])(
      'should use patches from %i to %i to change content from %i to %i',
      (
        anchorIndex: number,
        headIndex: number,
        initialContentIndex: number,
        expectedContentIndex: number,
      ) => {
        expect(
          patchLayoutContent(
            ensureDefined(contents[initialContentIndex]),
            value,
            anchorIndex,
            headIndex,
          ),
        ).toEqual(contents[expectedContentIndex])
      },
    )
  })
})
