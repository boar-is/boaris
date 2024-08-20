import type { Interpolation } from '~/lib/db/_shared'
import type { TextTrackRecording } from '~/lib/db/tracks/text'
import type { Recording } from '../recordings'

export type FileTreeTrack = {
  path: '.meta/file-tree'
  interpolation: Interpolation<{
    recordingId: TextTrackRecording['_id']
    progress: number
  }>
  recordings: Array<FileTreeTrackRecording>
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
