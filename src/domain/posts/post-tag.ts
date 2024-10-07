import type { Id } from '~/src/shared/id'

export type PostTag = {
  _id: Id
  _creationTime: number
  postId: Id
  tagId: Id
}
