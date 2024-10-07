import type { Id } from '~/src/shared/id'

export type PostAuthor = {
  _id: Id
  _creationTime: number
  postId: Id
  authorId: Id
}
