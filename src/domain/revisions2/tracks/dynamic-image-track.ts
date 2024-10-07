import type { Entity } from '~/src/shared/entity'

export type DynamicImageTrack = {
  readonly _tag: 'DynamicImageTrack'
  readonly name: string
  readonly storageFileId: Entity['_id']
  readonly caption: string | null
}
