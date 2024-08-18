import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from '~/lib/db/posts'
import type { TagDoc } from './tags'

export type PostTagDoc = Doc & {
  postId: PostDoc['_id']
  tagId: TagDoc['_id']
}

export const postTagDocs: ReadonlyArray<PostTagDoc> = [
  {
    _id: '1',
    postId: '1',
    tagId: '1',
    _creationTime: Date.now(),
  },
  {
    _id: '2',
    postId: '1',
    tagId: '2',
    _creationTime: Date.now(),
  },
]
