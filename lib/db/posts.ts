import type { Doc } from '~/lib/db/_shared'
import type { WorkspaceDoc } from '~/lib/db/workspaces'
import type { RevisionDoc } from './revisions'
import type { StorageDoc } from './storages'

export type PostDoc = Doc & {
  name: string
  slug: string
  description: string
  lead?: string | undefined
  thumbnailId?: StorageDoc['_id'] | undefined
  workspaceId: WorkspaceDoc['_id']
  draftRevisionId: RevisionDoc['_id']
  publishedRevisionId: RevisionDoc['_id']
}

export class PostRepository {
  static #data = [] satisfies ReadonlyArray<PostDoc>
}
