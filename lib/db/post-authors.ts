import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from './posts'
import type { UserDoc } from './users'

export type PostAuthorDoc = Doc & {
  postId: PostDoc['_id']
  userId: UserDoc['_id']
}

export class PostAuthorRepository {
  static #data: ReadonlyArray<PostAuthorDoc> = [
    {
      _id: '1',
      postId: '1',
      userId: '1',
      _creationTime: Date.now(),
    },
  ]

  static findByPostId(postId: PostDoc['_id']) {
    return PostAuthorRepository.#data.filter((it) => it.postId === postId)
  }
}
