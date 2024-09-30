import type { Delta } from '~/lib/diffpatcher'
import type { StorageDoc } from '~/lib/model/docs/storages'

export const videoExtensions = ['mp4'] as const

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

export type VideoTrackValue = {
  storageId: StorageDoc['_id']
  caption?: string | undefined
  mapping?:
    | {
        input: Array<number>
        output: Array<number>
      }
    | undefined
}
