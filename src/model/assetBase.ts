import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { Id } from '~/convex/_generated/dataModel'

export const assetBase = v.object({
  revisionId: v.id('revisions'),
  name: v.string(),
})

export class AssetBase extends Schema.Class<AssetBase>('AssetBase')({
  _id: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
}) {
  static encodedFromEntity({
    _id,
    name,
  }: Infer<typeof assetBase> & { _id: Id<'assets'> }) {
    return {
      _id,
      name,
    }
  }
}
