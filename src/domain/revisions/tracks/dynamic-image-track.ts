import type { StorageFile } from '~/src/domain/storage/storage-file'

export type DynamicImageTrack = {
  readonly _tag: 'DynamicImageTrack'
  readonly name: string
  readonly storageFileId: StorageFile['_id']
  readonly caption: string | null
}
