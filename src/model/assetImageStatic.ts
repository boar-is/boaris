import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { Id } from '~/convex/_generated/dataModel'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import { AssetBase, assetBase } from './assetBase'

export const assetImageStatic = v.object({
  ...assetBase.fields,
  type: v.literal('image-static'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
  alt: v.optional(v.string()),
})

export class AssetImageStatic extends AssetBase.extend<AssetImageStatic>(
  'AssetImageStatic',
)({
  type: Schema.Literal('image-static'),
  url: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  alt: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      type,
      storageId,
      caption,
      alt,
      ...base
    }: Infer<typeof assetImageStatic> & { _id: Id<'assets'> }): Promise<
      typeof AssetImageStatic.Encoded
    > => ({
      ...AssetBase.encodedFromEntity(base),
      type,
      url: (await getUrl(storageId))!,
      caption,
      alt,
    })
  }
}
