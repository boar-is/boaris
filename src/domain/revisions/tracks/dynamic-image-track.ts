import type { Id } from '~/src/shared/id'
import type { DynamicImageTrackOverride } from './dynamic-image-track-override'
import type { DynamicImageTrackValue } from './dynamic-image-track-value'

export type DynamicImageTrack = {
  readonly _id: Id
  readonly _tag: 'DynamicImageTrack'
  readonly name: string
  readonly value: DynamicImageTrackValue
  readonly overrides: ReadonlyArray<DynamicImageTrackOverride> | null
}
