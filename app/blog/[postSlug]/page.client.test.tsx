import { describe, expect, it } from 'vitest'
import { type Delta, diffpatcher } from '~/lib/diffpatcher'
import type { LayoutContent, LayoutValue } from '~/lib/model/revision/layout'
import { ensureDefined } from '~/lib/utils'

const patchLayoutContent = (
  content: LayoutContent,
  value: LayoutValue,
  anchorIndex: number,
  headIndex: number,
) => {
  let contentCopy = diffpatcher.clone(content) as LayoutValue

  if (anchorIndex === headIndex) {
    return contentCopy
  }

  const patch = (
    index: number,
    fn: (left: unknown, delta: Delta) => unknown,
  ) => {
    const change = ensureDefined(value.changes[index])
    if (change.value.type !== 'delta') {
      return contentCopy
    }
    return fn(contentCopy, change.value.delta) as LayoutValue
  }

  if (anchorIndex < headIndex) {
    const fn = (left: unknown, delta: Delta) => diffpatcher.patch(left, delta)
    for (let i = anchorIndex; i <= headIndex; i++) {
      contentCopy = patch(i, fn)
    }
  } else {
    const fn = (left: unknown, delta: Delta) => diffpatcher.unpatch(left, delta)
    for (let i = headIndex; i >= anchorIndex; i--) {
      contentCopy = patch(i, fn)
    }
  }

  return contentCopy
}

describe('patchLayoutContent', () => {
  const contents: ReadonlyArray<LayoutContent> = [
    {},
    {
      main: {
        _id: '1',
        direction: 'h',
        content: [
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
        _id: '1',
        direction: 'h',
        content: [
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
    {
      main: {
        _id: '1',
        direction: 'h',
        content: [
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
          {
            _id: '3',
            content: {
              trackId: '3',
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
        _id: '1',
        at: 0,
        value: {
          type: 'skip',
        },
      },
      {
        _id: '2',
        at: 0.2,
        value: {
          type: 'delta',
          delta: diffpatcher.diff(contents[0], contents[1]),
        },
      },
      {
        _id: '3',
        at: 0.4,
        value: {
          type: 'skip',
        },
      },
      {
        _id: '4',
        at: 0.6,
        value: {
          type: 'delta',
          delta: diffpatcher.diff(contents[1], contents[2]),
        },
      },
      {
        _id: '4',
        at: 0.8,
        value: {
          type: 'skip',
        },
      },
    ],
  }

  describe('5 changes (skip, delta, skip, delta, skip)', () => {
    it.each([
      [0, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 2, 0, 1],
      [0, 3, 0, 2],
      [0, 4, 0, 2],
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
