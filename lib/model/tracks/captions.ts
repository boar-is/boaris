import type { JSONContent } from '@tiptap/react'

export type CaptionsTrack = {
  _id: string
  _tag: 'CaptionsTrack'
  path: string
  content: JSONContent
  locale?: string | undefined
  mapping: {
    input: Array<number>
    output: Array<number>
  }
}
