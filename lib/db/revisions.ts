import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from '~/lib/db/posts'

export type RevisionDoc = Doc & {
  postId: PostDoc['_id']
}

export class RevisionRepository {
  static #data: ReadonlyArray<RevisionDoc> = [
    {
      _id: '1',
      postId: '1',
      _creationTime: Date.now(),
    },
  ]
}
