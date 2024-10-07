import type { Id } from '~/src/shared/id'

export type WorkspaceMember = {
  _id: Id
  _creationTime: number
  memberId: Id
  workspaceId: Id
  role: 'owner' | 'editor'
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
