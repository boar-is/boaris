import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { Action, action } from './action'

export const trackChunk = v.object({
  revisionId: v.id('revisions'),
  offset: v.number(),
  /**
   * Record's key is for track's id
   */
  actions: v.record(v.string(), v.array(action)),
})

type ActionsByTrackId = Record<string, Array<Infer<typeof action>>>
export const toActionsByTrackId = (
  chunks: Array<Infer<typeof trackChunk>>,
): ActionsByTrackId => {
  const unsortedActions = chunks.reduce((record: ActionsByTrackId, chunk) => {
    for (const [trackId, trackActions] of Object.entries(chunk.actions)) {
      const offsetTrackActions = trackActions.map((it) => ({
        ...it,
        offset: it.offset + chunk.offset,
      }))
      record[trackId] =
        record[trackId]?.concat(offsetTrackActions) ?? offsetTrackActions
    }

    return record
  }, {})

  return Object.fromEntries(
    Object.entries(unsortedActions).map(
      ([key, value]) =>
        [key, value.slice().sort((a, b) => a.offset - b.offset)] as const,
    ),
  )
}

export class TrackChunk extends Schema.Class<TrackChunk>('TrackChunk')({
  offset: Schema.Number,
  actions: Schema.HashMap({
    key: Schema.NonEmptyTrimmedString,
    value: Schema.Array(Action),
  }),
}) {}
