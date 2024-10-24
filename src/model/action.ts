import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert)

export const Action = Schema.Union(ActionInsert)
export const actionEncodedFromEntity = (
  a: Infer<typeof action>,
): typeof Action.Encoded =>
  Match.value(a).pipe(
    Match.when({ type: 'insert' }, ActionInsert.encodedFromEntity),
    Match.exhaustive,
  )
