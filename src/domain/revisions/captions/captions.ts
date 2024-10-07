import type { JSONContent } from '@tiptap/react'
import type { Interpolation } from '~/src/shared/interpolation'

export type Captions = {
  value: JSONContent
  interpolation: Interpolation | null
}
