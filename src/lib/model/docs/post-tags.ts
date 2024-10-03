import type { Doc } from '~/lib/model/docs/_shared'
import type { PostDoc } from '~/lib/model/docs/posts'
import type { TagDoc } from './tags'

export type PostTagDoc = Doc & {
  postId: PostDoc['_id']
  tagId: TagDoc['_id']
}

export const postTagDocs: ReadonlyArray<PostTagDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    postId: '1',
    tagId: '1',
  },
  {
    _id: '2',
    _creationTime: Date.now(),
    postId: '1',
    tagId: '2',
  },
]
