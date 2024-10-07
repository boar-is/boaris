import type { Id } from '~/src/shared/id'
import type { Action } from './actions/action'

export type Chunk = {
  _id: Id
  _creationTime: number
  revisionId: Id
  offset: number
  actions: Record<Id, Array<Action>>
}

export const chunkRepository: Array<Chunk> = [
  {
    _id: 'pApo1ZtHnWwV',
    _creationTime: Date.now(),
    revisionId: 'CazXWqJz7tmF',
    offset: 0,
    actions: {
      EXS2EWkhvxRp: [
        {
          offset: 100,
        },
      ],
    },
  },
]
