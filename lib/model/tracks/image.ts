import type { StorageDoc } from '~/lib/model/docs/storages'

export const imageExtensions = ['webp'] as const

export type ImageTrackValue = {
  storageId: StorageDoc['_id']
}

export type ImageTrack = {
  _id: string
  _tag: 'ImageTrack'
  name: string
  value: ImageTrackValue
  overrides?:
    | Array<{
        _id: string
        locale: string
        value: ImageTrackValue
      }>
    | undefined
}
