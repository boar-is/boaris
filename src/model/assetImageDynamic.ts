import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { Id } from '~/convex/_generated/dataModel'
import type { PropsWithGetUrl } from '~/lib/regexes/props-with-get-url'
import { AssetBase, assetBase } from './assetBase'

export const assetImageDynamic = v.object({
  ...assetBase.fields,
  type: v.literal('image-dynamic'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
})

export class AssetImageDynamic extends AssetBase.extend<AssetImageDynamic>(
  'AssetImageDynamic',
)({
  type: Schema.Literal('image-dynamic'),
  url: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      type,
      storageId,
      caption,
      ...base
    }: Infer<typeof assetImageDynamic> & { _id: Id<'assets'> }): Promise<
      typeof AssetImageDynamic.Encoded
    > => ({
      ...AssetBase.encodedFromEntity(base),
      type,
      url: (await getUrl(storageId))!,
      caption,
    })
  }
}
