import type { StorageDoc } from '~/lib/model/docs/storages'
import type {
  Interpolation,
  PathWithExtensions,
  TrackBase,
} from '~/lib/model/tracks/_shared'

export const videoExtensions = ['mp4'] as const
export type VideoTrack2 = TrackBase & {
  path: PathWithExtensions<typeof videoExtensions>
  storageId: StorageDoc['_id']
  progressInterpolation?: Interpolation | undefined
}

export type VideoTrackValue = {
  storageId: StorageDoc['_id']
  mapping?:
    | {
        input: Array<number>
        output: Array<number>
      }
    | undefined
}

export type VideoTrack = {
  _id: string
  _tag: 'VideoTrack'
  name: string
  items: Array<{
    locale?: string | undefined
    value: VideoTrackValue
  }>
}
