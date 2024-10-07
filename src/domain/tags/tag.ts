import type { Id } from '~/src/shared/id'

export type Tag = {
  _id: Id
  _creationTime: number
  name: string
  slug: string
  /**
   * If null, then the tag is global
   */
  projectId: Id | null
}
