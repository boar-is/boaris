import { Schema } from 'effect'
import { AssetBase } from './assetBase'

export class AssetImageStatic extends AssetBase.extend<AssetImageStatic>(
  'AssetImageStatic',
)({
  type: Schema.Literal('image-static'),
  href: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  alt: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {}
