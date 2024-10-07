import type { Id } from '~/src/shared/id'

export type WorkspaceMember = {
  _id: Id
  _creationTime: number
  memberId: Id
  workspaceId: Id
  role: 'owner' | 'editor'
}
