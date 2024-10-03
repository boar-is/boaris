import type { Entity } from '~/src/shared/entity'

export type ImageTrackValue = {
  storageId: Entity['_id']
  alt?: string | undefined
  caption?: string | undefined
}
