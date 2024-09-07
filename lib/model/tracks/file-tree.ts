import type {
  Interpolation,
  Recording,
  TrackBase,
} from '~/lib/model/tracks/_shared'
import type { TextTrackRecording } from '~/lib/model/tracks/text'

export type FileTreeTrack = TrackBase & {
  path: '.meta/file-tree'
  interpolation?:
    | Interpolation<{
        recordingId: TextTrackRecording['_id']
        progress: number
      }>
    | undefined
  recordings?: Array<FileTreeTrackRecording> | undefined
}

// TODO to deltas
export type FileTreeTrackRecording = Recording<
  | {
      type: 'Create'
      paths: Array<string>
    }
  | {
      type: 'Delete'
      paths: Array<string>
    }
  | {
      type: 'Rename'
      pairs: Array<[oldPath: string, newPath: string]>
    }
>
