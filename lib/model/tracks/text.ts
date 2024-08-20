import type { Interpolation, Recording } from './_shared'

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type TextTrack = {
  path: string
  value: string
  interpolation?:
    | Interpolation<{
        recordingId: TextTrackRecording['_id']
        progress: number
      }>
    | undefined
  recordings?: Array<TextTrackRecording> | undefined
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
