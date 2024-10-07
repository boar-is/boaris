import type { StorageFile } from '~/src/domain/storage/storage-file'

export type StaticImageTrack = {
  readonly _tag: 'StaticImageTrack'
  readonly name: string
  readonly storageFileId: StorageFile['_id']
  readonly alt: string | null
  readonly caption: string | null
}
