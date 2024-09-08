import type { JSONContent } from '@tiptap/react'
import type { Delta } from '~/lib/diffpatcher'

export type Captions = {
  value: CaptionsValue
  overrides?:
    | Array<{
        _id: string
        locale: string
        delta: Delta
      }>
    | undefined
}

export type CaptionsValue = {
  content: JSONContent
  mapping?:
    | {
        input: Array<number>
        output: Array<number>
      }
    | undefined
}
