import type { Delta } from '~/lib/diffpatcher'
import type { Id } from '~/src/shared/id'

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  _id: Id
  _tag: 'TextTrack'
  name: string
  value: TextTrackValue
  overrides?:
    | Array<{
        _id: Id
        locale: string
        delta: Delta
      }>
    | undefined
}

export type TextTrackValue = {
  content: Array<string>
  actions?:
    | Array<{
        _id: Id
        atMs: number
        value: TextTrackActionValue
      }>
    | undefined
}

export type TextTrackActionValue =
  | {
      type: 'Insert'
      from: number
      to?: number | undefined
      insert: string
    }
  | {
      type: 'Select'
      ranges: Array<{ anchor: number; head?: number }>
    }
