import type { Id } from '~/src/shared/id'
import type { DynamicImageTrackValue } from './dynamic-image-track-value'

export type DynamicImageTrackOverride = {
  readonly _id: Id
  readonly locale: string
  readonly value: DynamicImageTrackValue
}
