import type { Revision } from '~/src/domain/revisions/revision'
import type { Track } from '~/src/domain/revisions/tracks/track'
import type { Entity } from '~/src/shared/entity'
import type { Action } from './actions/action'

export type Chunk = Entity & {
  readonly revisionId: Revision['_id']
  readonly offset: number
  readonly actions: Record<Track['_id'], ReadonlyArray<Action>>
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
