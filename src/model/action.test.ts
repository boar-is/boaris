import { describe } from 'vitest'
import type { Action } from '~/model/action'

describe.concurrent('seekCodeMirrorActions', () => {
  const initialValue = 'hello, world'
  const actions: ReadonlyArray<typeof Action.Type> = []
})
