import type { Id } from '~/src/shared/id'

export type StaticImageTrack = {
  _id: Id
  _tag: 'StaticImageTrack'
  name: string
  storageFileId: Id
  alt: string | null
  caption: string | null
}
