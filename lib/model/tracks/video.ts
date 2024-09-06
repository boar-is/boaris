import type { StorageDoc } from '~/lib/model/docs/storages'
import type {
  Interpolation,
  PathWithExtensions,
  TrackBase,
} from '~/lib/model/tracks/_shared'

export const videoExtensions = ['mp4'] as const
export type VideoTrack = TrackBase & {
  path: PathWithExtensions<typeof videoExtensions>
  storageId: StorageDoc['_id']
  progressInterpolation?: Interpolation | undefined
}
