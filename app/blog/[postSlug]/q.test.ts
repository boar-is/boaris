import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { expect, it } from 'vitest'
import { findClosestIndex } from '~/lib/utils/find-closest-index'

it('q', () => {
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
  const { result, rerender } = renderHook(
    (progress: number) => {
      const currentIndex = findClosestIndex(arr, progress, (it) => it.at)
      const previousIndex = useRef(currentIndex)
      if (currentIndex !== previousIndex.current) {
        previousIndex.current = currentIndex
      }

      return [previousIndex.current, currentIndex]
    },
    {
      initialProps: 0,
    },
  )

  expect(result.current).toBe(null)
  rerender(0.1)
  expect(result.current).toBe(null)
  rerender(0.2)
  expect(result.current).toEqual([null, 1])
})
