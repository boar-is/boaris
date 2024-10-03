import type { Entity } from '~/src/shared/entity'

export type DynamicImageTrackValue = {
  readonly storageId: Entity['_id']
  readonly caption?: string | undefined
}
