import { renderHook } from '@testing-library/react'
import { useMemo, useState } from 'react'
import { expect, it } from 'vitest'

it('test test', async () => {
  const { result, rerender } = renderHook(
    (initial) => {
      const [value, setValue] = useState(initial)
      const doubled = useMemo(() => value * 2, [value])
      return [doubled, setValue] as const
    },
    {
      initialProps: 0,
    },
  )
  expect(result.current[0]).toEqual(0)
  result.current[1]((i) => i + 1)
  rerender()
  expect(result.current[0]).toEqual(2)
})
