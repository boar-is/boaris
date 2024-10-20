import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'

export const layoutLayer = v.object({
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: v.string(),
  columns: v.optional(v.string()),
  rows: v.optional(v.string()),
})

export class LayoutLayer extends S.Class<LayoutLayer>('LayoutLayer')({
  areas: S.NonEmptyTrimmedString,
  columns: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  rows: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({
    areas,
    columns,
    rows,
  }: Infer<typeof layoutLayer>): typeof LayoutLayer.Encoded {
    return {
      areas,
      columns,
      rows,
    }
  }
}
