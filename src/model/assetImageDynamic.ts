import { Schema } from 'effect'
import { AssetBase } from './assetBase'

export class AssetImageDynamic extends AssetBase.extend<AssetImageDynamic>(
  'AssetImageDynamic',
)({
  type: Schema.Literal('image-dynamic'),
  href: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {}
