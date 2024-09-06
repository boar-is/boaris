import type { StorageDoc } from '~/lib/model/docs/storages'
import type { PathWithExtensions, TrackBase } from './_shared'

export const imageExtensions = ['webp'] as const
export type ImageTrack = TrackBase & {
  path: PathWithExtensions<typeof imageExtensions>
  storageId: StorageDoc['_id']
}
