import type { RevisionDoc } from '~/lib/db/revisions'
import type { Doc } from './_shared'

export type Track = Doc & {
  name: string
} & (
    | {
        type: 'Captions'
      }
    | { type: 'Layout' }
  )

export type RevisionTrack = Doc & {
  revisionId: RevisionDoc['_id']
  trackId: Track['_id']
}

export type Clip = Doc

export type FileTree = Doc & {
  /**
   * These values do not change during the playback, though can be overridden
   */
  files: Record<string, Array<string>>
}
