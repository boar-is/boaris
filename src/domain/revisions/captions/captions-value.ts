import type { JSONContent } from '@tiptap/react'
import type { Interpolation } from '~/src/shared/interpolation'

export type CaptionsValue = {
  readonly content: JSONContent
  readonly interpolation: Interpolation | null
}
