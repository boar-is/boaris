import { it } from 'vitest'
import { diffpatcher } from '../diffpatcher'

it('should test', () => {
  console.log(diffpatcher.diff(null, {}))
})
