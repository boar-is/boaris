import type { Project } from '~/src/domain/projects/project'
import type { Entity } from '~/src/shared/entity'

export type Tag = Entity & {
  readonly name: string
  readonly slug: string
  /**
   * If null, then the tag is global
   */
  readonly projectId: Project['_id'] | null
}

export const tagRepository: ReadonlyArray<Tag> = [
  {
    _id: 'BD7CUF0KvKWK',
    _creationTime: Date.now(),
    name: 'TypeScript',
    slug: 'typescript',
    projectId: null,
  },
  {
    _id: 'oJ16_FavtbUe',
    _creationTime: Date.now(),
    name: 'React',
    slug: 'react',
    projectId: null,
  },
]
