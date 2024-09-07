import type { JSONContent } from '@tiptap/react'
import type { Delta } from '~/lib/diffpatcher'

export type CaptionsTrackValue = {
  content: JSONContent
  mapping?:
    | {
        input: Array<number>
        output: Array<number>
      }
    | undefined
}

export type CaptionsTrackDelta = Delta

export type CaptionsTrack = {
  _id: string
  _tag: 'CaptionsTrack'
  value: CaptionsTrackValue
  overrides?:
    | Array<{
        locale: string
        delta: Delta
      }>
    | undefined
}
