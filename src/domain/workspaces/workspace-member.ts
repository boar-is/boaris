import type { Entity } from '~/src/shared/entity'

export type WorkspaceMember = Entity & {
  readonly memberId: Entity['_id']
  readonly workspaceId: Entity['_id']
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
