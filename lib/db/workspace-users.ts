import type { Doc } from '~/lib/db/_shared'
import type { UserDoc } from './users'
import type { WorkspaceDoc } from './workspaces'

export type WorkspaceUserDoc = Doc & {
  workspaceId: WorkspaceDoc['_id']
  userId: UserDoc['_id']
}

export const workspaceUserDocs = [] satisfies ReadonlyArray<WorkspaceUserDoc>
