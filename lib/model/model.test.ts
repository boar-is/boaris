import { it } from 'vitest'
import { diff } from '~/lib/diffpatcher'

it('should test', () => {
  diff({}, { a: 2 })
})
