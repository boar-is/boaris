import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { LayoutLayer, layoutLayer } from './layoutLayer'

export const layoutChange = v.object({
  /**
   * id is needed for patching optimizations
   */
  id: v.string(),
  /**
   * a number from 0 to 1
   */
  offset: v.number(),
  layer: layoutLayer,
})

export class LayoutChange extends Schema.Class<LayoutChange>('LayoutChange')({
  id: Schema.NonEmptyTrimmedString,
  offset: Schema.Number,
  layer: LayoutLayer,
}) {
  static encodedFromEntity({
    id,
    offset,
    layer,
  }: Infer<typeof layoutChange>): typeof LayoutChange.Encoded {
    return {
      id,
      offset,
      layer: LayoutLayer.encodedFromEntity(layer),
    }
  }
}
