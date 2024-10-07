import type { Id } from '~/src/shared/id'

export type Post = {
  _id: Id
  _creationTime: number
  title: string
  lead: string | null
  description: string
  slug: string
  thumbnailId: Id | null
  projectId: Id
  draftRevisionId: Id | null
  publishedRevisionId: Id | null
  revisionsStorageIds: Array<Id>
}
