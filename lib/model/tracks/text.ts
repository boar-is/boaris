import type { Delta } from '~/lib/diffpatcher'

export type TextTrackActionValue =
  | {
      _tag: 'Insert'
      from: number
      to?: number | undefined
      insert: string
    }
  | {
      type: 'Select'
      ranges: Array<{ anchor: number; head?: number }>
    }

export type TextTrackValue = {
  content: string
  actions?:
    | Array<{
        _id: string
        atMs: number
        value: TextTrackActionValue
      }>
    | undefined
}

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  _id: string
  _tag: 'TextTrack'
  name: string
  value: TextTrackValue
  overrides?:
    | Array<{
        _id: string
        locale: string
        delta: Delta
      }>
    | undefined
}
