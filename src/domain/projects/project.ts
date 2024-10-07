import type { Workspace } from '~/src/domain/workspaces/workspace'
import type { Entity } from '~/src/shared/entity'

export type Project = Entity & {
  readonly workspaceId: Workspace['_id']
  readonly name: string
  readonly slug: string
}

export const projectRepository: ReadonlyArray<Project> = [
  {
    _id: 'vyLFpVmXUmx4',
    _creationTime: Date.now(),
    workspaceId: 'f1yR23PbuoDW',
    name: 'Blog',
    slug: 'blog',
  },
]
