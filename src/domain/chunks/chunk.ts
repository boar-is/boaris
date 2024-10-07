import type { Id } from '~/src/shared/id'
import type { Action } from './actions/action'

export type Chunk = {
  _id: Id
  _creationTime: number
  revisionId: Id
  offset: number
  actions: Record<Id, Array<Action>>
}
