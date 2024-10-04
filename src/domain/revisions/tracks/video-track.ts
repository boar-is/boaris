import type { Id } from '~/src/shared/id'
import type { VideoTrackOverride } from './video-track-override'
import type { VideoTrackValue } from './video-track-value'

export type VideoTrack = {
  readonly _id: Id
  readonly _tag: 'VideoTrack'
  readonly name: string
  readonly value: VideoTrackValue
  readonly overrides: ReadonlyArray<VideoTrackOverride>
}
