import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'

export const actionBase = v.object({
  offset: v.number(),
})

export class ActionBase extends S.Class<ActionBase>('ActionBase')({
  offset: S.Number,
}) {
  static encodedFromEntity({
    offset,
  }: Infer<typeof actionBase>): typeof ActionBase.Encoded {
    return {
      offset,
    }
  }
}
