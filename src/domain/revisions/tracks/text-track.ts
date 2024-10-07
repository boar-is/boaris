import type { Id } from '~/src/shared/id'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  _id: Id
  _tag: 'TextTrack'
  name: string
  value: string
}
