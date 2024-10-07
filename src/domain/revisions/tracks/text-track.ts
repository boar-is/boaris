/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  readonly _tag: 'TextTrack'
  readonly name: string
  readonly value: string
}
