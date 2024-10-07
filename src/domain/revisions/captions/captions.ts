import type { JSONContent } from '@tiptap/react'
import type { Interpolation } from '~/src/shared/interpolation'

export type Captions = {
  readonly value: JSONContent
  readonly interpolation: Interpolation | null
}
