import type { Entity } from '~/src/shared/entity'

export type StaticImageTrackValue = {
  readonly storageId: Entity['_id']
  readonly alt?: string | undefined
  readonly caption?: string | undefined
}
