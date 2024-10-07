import type { Id } from '~/src/shared/id'

export type PostAuthor = {
  _id: Id
  _creationTime: number
  postId: Id
  authorId: Id
}

export const postAuthorRepository: Array<PostAuthor> = [
  {
    _id: 'L3foO3eTAtYi',
    _creationTime: Date.now(),
    postId: 'oclcmSQoOSCF',
    authorId: 'QcXfwMYqlHu5',
  },
]
