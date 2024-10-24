import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const actionBase = v.object({
  offset: v.number(),
})

export class ActionBase extends Schema.Class<ActionBase>('ActionBase')({
  offset: Schema.Number,
}) {
  static encodedFromEntity({
    offset,
  }: Infer<typeof actionBase>): typeof ActionBase.Encoded {
    return {
      offset,
    }
  }
}
