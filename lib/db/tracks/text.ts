import type { Interpolation } from '../_shared'
import type { Recording } from '../recordings'

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  path: string
  value: string
  interpolation: Interpolation<{
    recordingId: TextTrackRecording['_id']
    progress: number
  }>
  recordings: Array<TextTrackRecording>
}

export type TextTrackRecording = Recording<
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
> & {
  initialValue: string
}
