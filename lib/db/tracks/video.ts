import type { Interpolation, PathWithExtensions } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export const videoExtensions = ['mp4'] as const
export type VideoTrack = {
  path: PathWithExtensions<typeof videoExtensions>
  value: StorageDoc['_id']
  progressInterpolation: Interpolation
}
