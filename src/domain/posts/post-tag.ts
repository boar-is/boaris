import type { Id } from '~/src/shared/id'

export type PostTag = {
  _id: Id
  _creationTime: number
  postId: Id
  tagId: Id
}

export const postTagRepository: Array<PostTag> = [
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
