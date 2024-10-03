import type { Entity } from '~/src/shared/entity'

export type Project = Entity & {
  readonly workspaceId: Entity['_id']
  readonly displayName: string
  readonly slug: string
}

export const projectRepository: ReadonlyArray<Project> = [
  {
    _id: 'vyLFpVmXUmx4',
    _creationTime: Date.now(),
    workspaceId: 'f1yR23PbuoDW',
    displayName: 'Blog',
    slug: 'blog',
  },
]
