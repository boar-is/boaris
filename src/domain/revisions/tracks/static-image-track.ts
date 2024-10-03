import type { Id } from '~/src/shared/id'
import type { StaticImageTrackOverride } from './static-image-track-override'
import type { StaticImageTrackValue } from './static-image-track-value'

export type StaticImageTrack = {
  readonly _id: Id
  readonly _tag: 'StaticImageTrack'
  readonly name: string
  readonly value: StaticImageTrackValue
  readonly overrides: ReadonlyArray<StaticImageTrackOverride> | null
}
