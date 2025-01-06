import { Schema } from 'effect'
import { OffsetChange } from '~/lib/cm/offset-change'
import { TextFromStringArray } from '~/lib/cm/text'

export class AssetContentImageDynamic extends Schema.TaggedClass<AssetContentImageDynamic>()(
  'AssetContentImageDynamic',
  {
    href: Schema.NonEmptyTrimmedString,
    caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  },
) {}

export class AssetContentImageStatic extends Schema.TaggedClass<AssetContentImageStatic>()(
  'AssetContentImageStatic',
  {
    href: Schema.NonEmptyTrimmedString,
    caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
    alt: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  },
) {}

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export class AssetContentText extends Schema.TaggedClass<AssetContentText>()(
  'AssetContentText',
  {
    initialValue: TextFromStringArray,
    advances: Schema.Array(OffsetChange),
  },
) {}

export class Asset extends Schema.Class<Asset>('Asset')({
  _id: Schema.NonEmptyTrimmedString,
  postSlug: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
  content: Schema.Union(
    AssetContentImageDynamic,
    AssetContentImageStatic,
    AssetContentText,
  ),
}) {}
