import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const assetBase = v.object({
  revisionId: v.id('revisions'),
  name: v.string(),
})

export class AssetBase extends Schema.Class<AssetBase>('AssetBase')({
  name: Schema.NonEmptyTrimmedString,
}) {
  static encodedFromEntity({ name }: Infer<typeof assetBase>) {
    return {
      name,
    }
  }
}
