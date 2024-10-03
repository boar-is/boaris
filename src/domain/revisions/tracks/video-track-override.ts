import type { Delta } from '~/src/shared/delta'
import type { Id } from '~/src/shared/id'

export type VideoTrackOverride = {
  readonly _id: Id
  readonly locale: string
  readonly valueDelta: Delta
}
