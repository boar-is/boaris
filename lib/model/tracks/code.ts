import type { Interpolation, Recording } from './_shared'

/**
 * @example coding files like .ts, .tsx, .md, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type CodeTrack = {
  path: string
  value: string
  interpolation?:
    | Interpolation<{
        recordingId: CodeTrackRecording['_id']
        progress: number
      }>
    | undefined
  recordings?: Array<CodeTrackRecording> | undefined
}

export type CodeTrackRecording = Recording<
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
