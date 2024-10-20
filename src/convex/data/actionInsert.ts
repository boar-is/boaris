import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { ActionBase, actionBase } from './actionBase'

export const actionInsert = v.object({
  ...actionBase.fields,
  type: v.literal('insert'),
  from: v.number(),
  to: v.optional(v.number()),
  length: v.number(),
  value: v.optional(v.string()),
})

export class ActionInsert extends ActionBase.extend<ActionInsert>(
  'ActionInsert',
)({
  type: S.Literal('insert'),
  from: S.Number,
  to: S.OptionFromUndefinedOr(S.Number),
  length: S.Number,
  value: S.OptionFromUndefinedOr(S.String),
}) {
  static encodedFromEntity({
    type,
    from,
    to,
    length,
    value,
    ...base
  }: Infer<typeof actionInsert>): typeof ActionInsert.Encoded {
    return {
      ...ActionBase.encodedFromEntity(base),
      type,
      from,
      to,
      length,
      value,
    }
  }
}
