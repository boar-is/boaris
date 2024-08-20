import type { StorageDoc } from '~/lib/model/docs/storages'
import type { PathWithExtensions } from './_shared'

export const imageExtensions = ['webp'] as const
export type ImageTrack = {
  path: PathWithExtensions<typeof imageExtensions>
  storageId: StorageDoc['_id']
}
