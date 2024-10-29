import { Text } from '@uiw/react-codemirror'
import { describe, expect, it } from 'vitest'
import { reversedTextChanges } from '~/model/assetText'

describe.concurrent('reversedTextChanges', () => {
  it.concurrent.each<{
    params: Parameters<typeof reversedTextChanges>
    returns: ReturnType<typeof reversedTextChanges>
  }>([
    {
      params: [Text.empty, []],
      returns: [],
    },
  ])('$params -> $returns', ({ params, returns }) => {
    expect(reversedTextChanges(...params)).toEqual(returns)
  })
})
