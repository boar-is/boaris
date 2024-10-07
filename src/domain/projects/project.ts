import type { Id } from '~/src/shared/id'

export type Project = {
  _id: Id
  _creationTime: number
  workspaceId: Id
  name: string
  slug: string
}

export const projectRepository: Array<Project> = [
  {
    _id: 'vyLFpVmXUmx4',
    _creationTime: Date.now(),
    workspaceId: 'f1yR23PbuoDW',
    name: 'Blog',
    slug: 'blog',
  },
]
