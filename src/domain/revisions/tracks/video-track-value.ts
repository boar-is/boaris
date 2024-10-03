import type { Entity } from '~/src/shared/entity'
import type { Interpolation } from '~/src/shared/interpolation'

export type VideoTrackValue = {
  readonly storageFileId: Entity['_id']
  readonly caption: string | null
  readonly interpolation: Interpolation | null
}
