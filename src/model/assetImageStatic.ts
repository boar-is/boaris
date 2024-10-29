import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
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
    }: Infer<typeof assetImageStatic>): Promise<
      typeof AssetImageStatic.Encoded
    > => ({
      type,
      url: (await getUrl(storageId))!,
      caption,
      alt,
      ...AssetBase.encodedFromEntity(base),
    })
  }
}
