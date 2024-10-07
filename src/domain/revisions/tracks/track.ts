import type { DynamicImageTrack } from './dynamic-image-track'
import type { StaticImageTrack } from './static-image-track'
import type { TextTrack } from './text-track'
import type { TrackBase } from './track-base'

export type Track = TrackBase &
  (DynamicImageTrack | StaticImageTrack | TextTrack)
