import { userDocs } from '../db/users'
import { workspaceUserDocs } from '../db/workspace-users'
import type { WorkspaceDoc } from '../db/workspaces'

export class UserService {
  static getWorkspaceOwner(workspaceId: WorkspaceDoc['_id']) {
    const ownerId = workspaceUserDocs.find(
      (it) => it.workspaceId === workspaceId && it.role === 'owner',
    )?._id

    return userDocs.find((it) => it._id === ownerId)
  }
}
