import type { Entity } from '~/src/shared/entity'

export type StaticImageTrackValue = {
  readonly storageFileId: Entity['_id']
  readonly alt: string | null
  readonly caption: string | null
}
