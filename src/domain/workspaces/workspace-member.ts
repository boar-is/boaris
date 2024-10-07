import type { User } from '~/src/domain/users/user'
import type { Entity } from '~/src/shared/entity'
import type { Workspace } from './workspace'

export type WorkspaceMember = Entity & {
  readonly memberId: User['_id']
  readonly workspaceId: Workspace['_id']
  readonly role: 'owner' | 'editor'
}

export const workspaceMemberRepository: ReadonlyArray<WorkspaceMember> = [
  {
    _id: 'f1yR23PbuoDW',
    _creationTime: Date.now(),
    workspaceId: 'f1yR23PbuoDW',
    memberId: 'QcXfwMYqlHu5',
    role: 'owner',
  },
]
