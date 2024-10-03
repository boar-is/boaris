import type { Id } from '~/src/shared/id'
import type { StaticImageTrackValue } from './static-image-track-value'

export type StaticImageTrackOverride = {
  readonly _id: Id
  readonly locale: string
  readonly value: StaticImageTrackValue
}
