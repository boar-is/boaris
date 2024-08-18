import type { Doc } from '~/lib/db/_shared'
import type { WorkspaceDoc } from '~/lib/db/workspaces'

export type ProjectDoc = Doc & {
  workspaceId: WorkspaceDoc['_id']
  name: string
  slug: string
}

export const projectDocs: ReadonlyArray<ProjectDoc> = [
  {
    _id: '1',
    workspaceId: '1',
    name: 'Blog',
    slug: 'blog',
    _creationTime: Date.now(),
  },
]
