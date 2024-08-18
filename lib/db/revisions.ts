import type { Doc } from '~/lib/db/_shared'
import type { PostDoc } from '~/lib/db/posts'

export type RevisionDoc = Doc & {
  postId: PostDoc['_id']
}

export const revisionDocs = [] satisfies ReadonlyArray<RevisionDoc>
