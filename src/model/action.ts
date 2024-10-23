import { type Infer, v } from 'convex/values'
import * as M from 'effect/Match'
import * as S from 'effect/Schema'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert)

export const Action = S.Union(ActionInsert)
export const actionEncodedFromEntity = (
  a: Infer<typeof action>,
): typeof Action.Encoded =>
  M.value(a).pipe(
    M.when({ type: 'insert' }, ActionInsert.encodedFromEntity),
    M.exhaustive,
  )
