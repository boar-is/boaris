import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from './posts'
import type { UserDoc } from './users'

export type PostAuthorDoc = Doc & {
  postId: PostDoc['_id']
  userId: UserDoc['_id']
}

export const postAuthorDocs = [] satisfies ReadonlyArray<PostAuthorDoc>
