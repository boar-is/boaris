import type { Delta } from '~/lib/diffpatcher'
import type { StorageDoc } from '~/lib/model/docs/storages'

export const videoExtensions = ['mp4'] as const

export type VideoTrackValue = {
  storageId: StorageDoc['_id']
  mapping?:
    | {
        input: Array<number>
        output: Array<number>
      }
    | undefined
}

export type VideoTrack = {
  _id: string
  _tag: 'VideoTrack'
  name: string
  value: VideoTrackValue
  overrides?:
    | Array<{
        _id: string
        locale: string
        delta: Delta
      }>
    | undefined
}
