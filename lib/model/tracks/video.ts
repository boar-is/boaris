import type { StorageDoc } from '~/lib/model/docs/storages'
import type {
  Interpolation,
  PathWithExtensions,
} from '~/lib/model/tracks/_shared'

export const videoExtensions = ['mp4'] as const
export type VideoTrack = {
  path: PathWithExtensions<typeof videoExtensions>
  storageId: StorageDoc['_id']
  progressInterpolation?: Interpolation | undefined
}
