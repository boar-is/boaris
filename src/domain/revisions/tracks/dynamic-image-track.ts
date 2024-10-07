import type { Id } from '~/src/shared/id'

export type DynamicImageTrack = {
  _id: Id
  _tag: 'DynamicImageTrack'
  name: string
  storageFileId: Id
  caption: string | null
}
