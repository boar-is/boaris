import { Option, Schema } from 'effect'
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
    type: Schema.Literal('text'),
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

export const assets: ReadonlyArray<Asset> = [
  new Asset({
    _id: 'icon-180',
    postSlug: 'nextjs-metadata',
    name: 'icon-180.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/icon-180.webp',
      caption: Option.none(),
      alt: Option.some('An icon in a 180x180 frame'),
    }),
  }),
  new Asset({
    _id: 'icons-app-folder',
    postSlug: 'nextjs-metadata',
    name: 'icons-app-folder.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/icons-app-folder.webp',
      caption: Option.none(),
      alt: Option.some('A file tree with selected icons'),
    }),
  }),
  new Asset({
    _id: 'icons-too-much',
    postSlug: 'nextjs-metadata',
    name: 'icons-too-much.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/icons-too-much.webp',
      caption: Option.none(),
      alt: Option.some('An archive with a lot of redundant icons'),
    }),
  }),
  new Asset({
    _id: 'metadata-fields',
    postSlug: 'nextjs-metadata',
    name: 'metadata-fields.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/metadata-fields.webp',
      caption: Option.none(),
      alt: Option.some('An intellisense of the Metadata fields'),
    }),
  }),
  new Asset({
    _id: 'nextjs-docs-deduplication',
    postSlug: 'nextjs-metadata',
    name: 'nextjs-docs-deduplication.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/nextjs-docs-deduplication.webp',
      caption: Option.some(
        'An excerpt from “Benefits of Server Rendering” part of Next.js docs.',
      ),
      alt: Option.some('An excerpt from Next.js docs about deduplication.'),
    }),
  }),
  new Asset({
    _id: 'nextjs-docs-metadata-base',
    postSlug: 'nextjs-metadata',
    name: 'nextjs-docs-metadata-base.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/nextjs-docs-metadata-base.webp',
      caption: Option.some(
        'An excerpt from “metadataBase’ default value” part of Next.js docs.',
      ),
      alt: Option.some(
        'An excerpt from Next.js docs about metadataBase default value.',
      ),
    }),
  }),
  new Asset({
    _id: 'og-framing',
    postSlug: 'nextjs-metadata',
    name: 'og-framing.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/og-framing.webp',
      caption: Option.none(),
      alt: Option.some(
        'An example of an Open Graph image with a centered frame',
      ),
    }),
  }),
  new Asset({
    _id: 'real-favicon-generator-download',
    postSlug: 'nextjs-metadata',
    name: 'real-favicon-generator-download.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/real-favicon-generator-download.webp',
      caption: Option.some('Download the app files'),
      alt: Option.some(
        'A screenshot from the download page of RealFaviconGenerator',
      ),
    }),
  }),
  new Asset({
    _id: 'rich-results',
    postSlug: 'nextjs-metadata',
    name: 'rich-results.webp',
    content: new AssetContentImageStatic({
      href: '/assets/nextjs-metadata/rich-results.webp',
      caption: Option.some('Google Rich Results Carousel'),
      alt: Option.some('Google Rich Results Carousel.'),
    }),
  }),
]
