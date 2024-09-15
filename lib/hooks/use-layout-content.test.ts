import { renderHook } from '@testing-library/react'
import { useEffect, useMemo, useRef } from 'react'
import { describe, expect, it } from 'vitest'
import type { LayoutContent, LayoutValue } from '~/lib/model/revision/layout'
import { patchLayoutContent } from '~/lib/utils/patch-layout-content'
import { diffpatcher } from '../diffpatcher'

const useLayoutContent = (value: LayoutValue, headIndex: number) => {
  const anchorIndexRef = useRef(headIndex)
  useEffect(() => {
    anchorIndexRef.current = headIndex
  }, [headIndex])

  const previousContentRef = useRef<LayoutContent>()
  const content = useMemo<LayoutContent | undefined>(
    () =>
      patchLayoutContent(
        diffpatcher.clone(previousContentRef.current) as LayoutContent,
        value,
        anchorIndexRef.current ?? 0,
        headIndex,
      ),
    [value, headIndex],
  )
  useEffect(() => {
    previousContentRef.current = content
  }, [content])
  return content
}

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

    it('example 1', () => {
      const { result, rerender } = renderHook(
        ({ headIndex }) => useLayoutContent(value, headIndex),
        {
          initialProps: {
            headIndex: 0,
          },
        },
      )

      expect(result.current).toBeUndefined()
      rerender({ headIndex: 1 })
      console.log(JSON.stringify(result.current))
    })
  })
})
