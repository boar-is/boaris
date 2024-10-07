import type { Id } from '~/src/shared/id'

export type StaticImageTrack = {
  _id: Id
  type: 'static-image'
  name: string
  storageFileId: Id
  alt: string | null
  caption: string | null
}
