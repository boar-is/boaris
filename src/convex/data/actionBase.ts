import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

export const actionBase = v.object({
  offset: v.number(),
})

export class ActionBase extends S.Class<ActionBase>('ActionBase')({
  offset: S.Number,
}) {}
