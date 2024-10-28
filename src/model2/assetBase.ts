import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const assetBase = v.object({
  id: v.string(),
  name: v.string(),
})

export class AssetBase extends Schema.Class<AssetBase>('AssetBase')({
  id: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
}) {
  static encodedFromEntity({ id, name }: Infer<typeof assetBase>) {
    return {
      id,
      name,
    }
  }
}
