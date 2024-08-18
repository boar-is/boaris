import { UserRepository } from '../db/users'
import { WorkspaceUserRepository } from '../db/workspace-users'
import type { WorkspaceDoc } from '../db/workspaces'

export class UserService {
  static getWorkspaceOwner(workspaceId: WorkspaceDoc['_id']) {
    const ownerId = WorkspaceUserRepository.findByWorkspaceId(workspaceId).find(
      (it) => it.role === 'owner',
    )?._id

    return ownerId ? UserRepository.findOne(ownerId) : undefined
  }
}
