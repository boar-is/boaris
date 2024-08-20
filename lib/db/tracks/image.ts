import type { StorageDoc } from '~/lib/db/storages'
import type { PathWithExtensions } from '../_shared'

export const imageExtensions = ['webp'] as const
export type ImageTrack = {
  path: PathWithExtensions<typeof imageExtensions>
  value: StorageDoc['_id']
}
