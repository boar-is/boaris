import type { Id } from '~/src/shared/id'

export type DynamicImageTrack = {
  _id: Id
  type: 'dynamic-image'
  name: string
  storageFileId: Id
  caption: string | null
}
