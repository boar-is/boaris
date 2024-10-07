import type { Id } from '~/src/shared/id'

export type Project = {
  _id: Id
  _creationTime: number
  workspaceId: Id
  name: string
  slug: string
}
