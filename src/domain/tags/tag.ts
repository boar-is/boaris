import type { Id } from '~/src/shared/id'

export type Tag = {
  _id: Id
  _creationTime: number
  name: string
  slug: string
  /**
   * If null, then the tag is global
   */
  projectId: Id | null
}

export const tagRepository: Array<Tag> = [
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
