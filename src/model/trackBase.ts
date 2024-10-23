import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'
import { Action, type action } from './action'

export const trackBase = v.object({
  id: v.string(),
  name: v.string(),
})

export class TrackBase extends S.Class<TrackBase>('TrackBase')({
  id: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
  actions: S.Array(Action),
}) {
  static encodedFromEntity(
    { id, name }: Infer<typeof trackBase>,
    actions: Array<Infer<typeof action>>,
  ) {
    return {
      id,
      name,
      actions: actions.map(Action.encodedFromEntity),
    }
  }
}
