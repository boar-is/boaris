import type { JSONContent } from '@tiptap/react'
import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from './storages'

export type Action = {
  atMs: number
}

export type RenameAction = Action & {
  type: 'Rename'
  newName: string
}

export type CodeFileChange = Action & {
  type: 'CodeFileChange'
  from: number
  to?: number | undefined
  insert: string
}

export type AssetDoc = Doc & {
  /**
   * `active` when is shown
   * `hidden` when is not yet created
   * `deleted` when in the trash
   * @default active
   */
  status?: 'active' | 'hidden' | 'deleted' | undefined
} & (
    | {
        type: 'Image/Static'
        name: string
        storageId: StorageDoc['_id']
      }
    | {
        type: 'Image/Dynamic'
        name: string
        storageId: StorageDoc['_id']
      }
    | {
        type: 'Captions'
        doc: JSONContent
      }
    | {
        type: 'Track'
        name: string
      }
    | {
        type: 'Clip'
        assetId: AssetDoc['_id']
        trackId: AssetDoc['_id']
        offset: number
        length: number
        range: { from: number; to: number }
        transforms?:
          | {
              progress?:
                | {
                    input: ReadonlyArray<number>
                    output: ReadonlyArray<number>
                  }
                | undefined
            }
          | undefined
      }
    | {
        type: 'CodeFile'
        name: string
        /**
         * Empty string for a newly created file
         * This value does not change during a playback, but can be overridden
         */
        initialValue: string
      }
    | {
        type: 'RecordingGroup'
        name: string
        durationMs: number
      }
    | {
        type: 'CodeFileRecording'
        name: string
        groupId: AssetDoc['_id']
        targetId: AssetDoc['_id']
        initialValue: string
        actions: ReadonlyArray<RenameAction | CodeFileChange>
      }
  )

export const assetDocs = [] satisfies ReadonlyArray<AssetDoc>
