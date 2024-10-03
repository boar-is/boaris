import type { Entity } from '~/src/shared/entity'

export type DynamicImageTrackValue = {
  readonly storageFileId: Entity['_id']
  readonly caption?: string | undefined
}
