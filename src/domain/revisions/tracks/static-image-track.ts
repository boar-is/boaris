import type { Entity } from '~/src/shared/entity'

export type StaticImageTrack = {
  readonly _tag: 'StaticImageTrack'
  readonly name: string
  readonly storageFileId: Entity['_id']
  readonly alt: string | null
  readonly caption: string | null
}
