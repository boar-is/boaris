import type { Entity } from '~/src/shared/entity'
import type { Action } from './actions/action'

export type Chunk = Entity & {
  readonly revisionId: Entity['_id']
  readonly offset: number
  readonly actions: Record<Entity['_id'], ReadonlyArray<Action>>
}

export const chunkRepository: ReadonlyArray<Chunk> = [
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
