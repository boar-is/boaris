import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { Action, action } from './action'

export const trackChunk = v.object({
  revisionId: v.id('revisions'),
  offset: v.number(),
  /**
   * Record's key is for track's id
   */
  actions: v.record(v.string(), v.array(action)),
})

export class TrackChunk extends S.Class<TrackChunk>('TrackChunk')({
  offset: S.Number,
  actions: S.ReadonlyMapFromRecord({
    key: S.NonEmptyTrimmedString,
    value: S.Array(Action),
  }),
}) {
  static encodedActionsFromEntities(chunks: Array<string>): TrackChunk {}
}
