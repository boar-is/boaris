import type { Doc } from './_shared'
import type { RevisionFile } from './revisions'

type Action = unknown

export type RecordingDoc = Doc & {
  files: Record<RevisionFile['_id'], Array<Action>>
}

export const recordingDocs: Array<RecordingDoc> = []
