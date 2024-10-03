import type { DynamicImageTrack } from './dynamic-image-track'
import type { StaticImageTrack } from './static-image-track'
import type { TextTrack } from './text-track'
import type { VideoTrack } from './video-track'

export type Track =
  | StaticImageTrack
  | DynamicImageTrack
  | VideoTrack
  | TextTrack
