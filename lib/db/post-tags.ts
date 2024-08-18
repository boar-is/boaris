import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from '~/lib/db/posts'
import type { TagDoc } from './tags'

export type PostTagDoc = Doc & {
  postId: PostDoc['_id']
  tagId: TagDoc['_id']
}

export const postTagDocs = [] satisfies ReadonlyArray<PostTagDoc>
