import type { Doc } from '~/lib/db/_shared'
import type { UserDoc } from './users'
import type { WorkspaceDoc } from './workspaces'

export type WorkspaceUserDoc = Doc & {
  workspaceId: WorkspaceDoc['_id']
  userId: UserDoc['_id']
  role: 'owner' | 'editor'
}

export const workspaceUserDocs: ReadonlyArray<WorkspaceUserDoc> = [
  {
    _id: '1',
    workspaceId: '1',
    userId: '1',
    role: 'owner',
    _creationTime: Date.now(),
  },
]
