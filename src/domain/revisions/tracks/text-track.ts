import type { Id } from '~/src/shared/id'
import type { TextTrackOverride } from './text-track-override'
import type { TextTrackValue } from './text-track-value'

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  readonly _id: Id
  readonly _tag: 'TextTrack'
  readonly name: string
  readonly value: TextTrackValue
  readonly overrides: ReadonlyArray<TextTrackOverride>
}
