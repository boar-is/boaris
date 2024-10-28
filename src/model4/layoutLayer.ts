import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const layoutLayer = v.object({
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: v.string(),
  columns: v.optional(v.string()),
  rows: v.optional(v.string()),
})

export class LayoutLayer extends Schema.Class<LayoutLayer>('LayoutLayer')({
  areas: Schema.NonEmptyTrimmedString,
  columns: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  rows: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
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
