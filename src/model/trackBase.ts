import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { Action, type action } from './action'

export const trackBase = v.object({
  id: v.string(),
  name: v.string(),
})

export class TrackBase extends Schema.Class<TrackBase>('TrackBase')({
  id: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
  actions: Schema.Array(Action),
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
