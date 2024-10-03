import type { Entity } from '~/src/shared/entity'

export type Tag = Entity & {
  readonly displayName: string
  readonly slug: string
  /**
   * If undefined, then the tag is global
   */
  readonly projectId: Entity['_id'] | null
}

export const tagRepository: ReadonlyArray<Tag> = [
  {
    _id: 'BD7CUF0KvKWK',
    _creationTime: Date.now(),
    displayName: 'TypeScript',
    slug: 'typescript',
    projectId: null,
  },
  {
    _id: 'oJ16_FavtbUe',
    _creationTime: Date.now(),
    displayName: 'React',
    slug: 'react',
    projectId: null,
  },
]
