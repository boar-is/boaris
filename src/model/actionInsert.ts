import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
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
  type: Schema.Literal('insert'),
  from: Schema.Number,
  to: Schema.OptionFromUndefinedOr(Schema.Number),
  length: Schema.Number,
  value: Schema.OptionFromUndefinedOr(Schema.String),
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
