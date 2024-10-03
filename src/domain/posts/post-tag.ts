import type { Entity } from '~/src/shared/entity'

export type PostTag = Entity & {
  readonly postId: Entity['_id']
  readonly tagId: Entity['_id']
}

export const postTagRepository: ReadonlyArray<PostTag> = [
  {
    _id: 'm7XxpMjq1Coa',
    _creationTime: Date.now(),
    postId: 'oclcmSQoOSCF',
    tagId: 'BD7CUF0KvKWK',
  },
  {
    _id: 'GeP4P9XMsxBe',
    _creationTime: Date.now(),
    postId: 'oclcmSQoOSCF',
    tagId: 'oJ16_FavtbUe',
  },
]
