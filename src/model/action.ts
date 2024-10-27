import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'
import { ActionSelect, actionSelect } from '~/model/actionSelect'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert, actionSelect)

export const Action = Schema.Union(ActionInsert, ActionSelect)
export const actionEncodedFromEntity = (
  a: Infer<typeof action>,
): typeof Action.Encoded =>
  Match.value(a).pipe(
    Match.when({ type: 'insert' }, ActionInsert.encodedFromEntity),
    Match.when({ type: 'select' }, ActionSelect.encodedFromEntity),
    Match.exhaustive,
  )
