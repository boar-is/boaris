import type { Interpolation, Recording } from '~/lib/model/tracks/_shared'
import type { TextTrackRecording } from '~/lib/model/tracks/text'

export type FileTreeTrack = {
  path: '.meta/file-tree'
  interpolation?:
    | Interpolation<{
        recordingId: TextTrackRecording['_id']
        progress: number
      }>
    | undefined
  recordings?: Array<FileTreeTrackRecording> | undefined
}

export type FileTreeTrackRecording = Recording<
  | {
      type: 'Create'
      paths: Array<string>
    }
  | {
      type: 'Delete'
      paths: Array<string>
    }
>
