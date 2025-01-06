import { Option, Schema } from 'effect'
import {
  OffsetChange,
  createOffsetChangesShifter,
} from '~/lib/cm/offset-change'
import { TextFromStringArray, textFromTemplate } from '~/lib/cm/text'
import { pp1 } from './_no-db-helpers'

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

const shiftChanges = createOffsetChangesShifter()

const ch1 = (
  from: number,
  to: number,
  changes: ReadonlyArray<typeof OffsetChange.Encoded>,
) => shiftChanges(changes)(pp1(from), pp1(to))

export const assetRepository: ReadonlyArray<Asset> = [
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
  new Asset({
    _id: 'app/blog/[slug]/page.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/blog/[slug]/page.tsx',
    content: new AssetContentText({
      initialValue: textFromTemplate(''),
      advances: [
        ...ch1(1620, 1620, [
          [
            695,
            [
              [
                [
                  0,
                  "import type { Metadata } from 'next'",
                  "import { notFound } from 'next/navigation'",
                  '',
                  'export async function generateMetadata({',
                  '  params,',
                  '}: {',
                  '  params: Promise<{ slug: string }>',
                  '}): Promise<Metadata> {',
                  '}',
                  '',
                ],
              ],
              [[[199, 0]], null],
            ],
          ],
        ]),
        ...ch1(1670, 1670, [
          [
            1643,
            [
              [
                196,
                [
                  0,
                  '',
                  '  const { slug } = await params',
                  '',
                  '  const post = await fetchPostBySlug(slug)',
                ],
                3,
              ],
              [[[272, 196]], null],
            ],
          ],
        ]),
        ...ch1(1710, 1710, [
          [
            3472,
            [
              [
                272,
                [
                  0,
                  '',
                  '',
                  '  if (!post) {',
                  '    return {',
                  "      title: 'Post Not Found',",
                  '      openGraph: {',
                  "        title: 'Post Not Found',",
                  '      },',
                  '    }',
                  '  }',
                ],
                3,
              ],
              [[[403, 272]], null],
            ],
          ],
        ]),
        ...ch1(1750, 1750, [
          [
            5249,
            [
              [
                403,
                [
                  0,
                  '',
                  '',
                  '  const { title, description, thumbnailUrl } = post',
                  '',
                  '  return {',
                  '    title,',
                  '    description,',
                  '    openGraph: {',
                  '      title,',
                  '      description,',
                  '      images: thumbnailUrl,',
                  '    },',
                  '  }',
                ],
                3,
              ],
              [[[584, 403]], null],
            ],
          ],
        ]),
        ...ch1(1800, 1800, [[8855, [[587], [[[124, 130]], null]]]]),
        ...ch1(1825, 1825, [[10765, [[587], [[[157, 161]], null]]]]),
        ...ch1(1857, 1857, [
          [
            12578,
            [
              [
                586,
                [
                  0,
                  '',
                  '',
                  'export default async function Page({',
                  '  params,',
                  '}: {',
                  '  params: Promise<{ slug: string }>',
                  '}) {',
                  '  const { slug } = await params',
                  '',
                  '  const post = await fetchPostBySlug(slug)',
                  '',
                  '  if (!post) {',
                  '    return notFound()',
                  '  }',
                  '',
                  '  const { title } = post',
                  '',
                  '  return <div>{title}</div>',
                  '}',
                ],
                1,
              ],
              [[[855, 586]], null],
            ],
          ],
        ]),
        ...ch1(1893, 1893, [
          [
            14136,
            [
              [
                79,
                [
                  0,
                  '',
                  '',
                  'export async function generateStaticParams(): Promise<',
                  '  ReadonlyArray<{ slug: string }>',
                  '> {',
                  '  const posts = await fetchRecentPosts()',
                  '  return posts.map(({ slug }) => ({ slug }))',
                  '}',
                ],
                777,
              ],
              [[[261, 79]], null],
            ],
          ],
        ]),
        ...ch1(1955, 2040, [
          [952, [[1038], [[[169, 138]], null]]],
          [4163, [[1038], [[[354, 321]], null]]],
          [6664, [[1038], [[[857, 824]], null]]],
        ]),
        ...ch1(2013, 2035, [
          [
            492,
            [
              [261, [0, '', ''], 777],
              [[[262, null]], null],
            ],
          ],
          [
            850,
            [
              [262, [0, '', ''], 777],
              [[[263, null]], null],
            ],
          ],
          [
            1258,
            [
              [
                263,
                [
                  0,
                  'type Props = {',
                  '  params: Promise<{ slug: string }>',
                  '}',
                ],
                777,
              ],
              [[[315, null]], null],
            ],
          ],
          [2362, [[1092], [[[315, 263]], null]]],
          [
            3218,
            [
              [371, [39, 'Props'], 682],
              [[[376, null]], null],
            ],
          ],
          [4059, [[1058], [[[371, 376]], null]]],
          [
            4478,
            [
              [840, [39, 'Props'], 179],
              [[[845, null]], null],
            ],
          ],
          [5707, [[1024], [[[840, 845]], null]]],
        ]),
        ...ch1(2065, 2065, [[1307, [[1024], [[[169, 138]], null]]]]),
        ...ch1(2205, 2225, [
          [
            780,
            [
              [261, [0, '', '', 'type Params = '], 763],
              [[[277, 261]], null],
            ],
          ],
          [
            1795,
            [
              [277, [0, 'Awaited<>'], 763],
              [[[286, 277]], null],
            ],
          ],
          [
            2540,
            [
              [285, [0, 'ReturnType<>'], 764],
              [[[297, 285]], null],
            ],
          ],
          [
            3378,
            [
              [296, [0, 'typeof generateStaticParams'], 765],
              [[[323, 296]], null],
            ],
          ],
          [
            4274,
            [
              [325, [0, '[number]'], 763],
              [[[325, 333]], null],
            ],
          ],
          [
            5374,
            [
              [368, [16, 'Params'], 712],
              [[[374, 368]], null],
            ],
          ],
        ]),
        ...ch1(2282, 2282, [[7777, [[1086], [[[377, 263]], null]]]]),
        ...ch1(2420, 2435, [
          [
            1432,
            [
              [79, [0, '', ''], 1007],
              [[[80, null]], null],
            ],
          ],
          [
            2006,
            [
              [
                80,
                [
                  0,
                  "import type { WithStaticParams } from '~/lib/react/with-static-params'",
                ],
                1007,
              ],
              [[[150, null]], null],
            ],
          ],
          [5106, [[1157], [[[448, 334]], null]]],
          [
            6013,
            [
              [
                334,
                [
                  114,
                  'type Props = WithStaticParams<typeof generateStaticParams>',
                ],
                709,
              ],
              [[[392, null]], null],
            ],
          ],
          [7804, [[1101], [[[242, 196]], null]]],
          [
            8988,
            [
              [196, [46], 859],
              [[[196, null]], null],
            ],
          ],
        ]),
        ...ch1(2640, 2675, [
          [2464, [[1055], [[[505, 430]], null]]],
          [5756, [[1055], [[[955, 880]], null]]],
        ]),
        ...ch1(2967, 2967, [[1147, [[1055], [[[648, 653]], null]]]]),
        ...ch1(3026, 3044, [
          [
            4046,
            [
              [648, [5], 402],
              [[[648, null]], null],
            ],
          ],
          [4725, [[1050], [[[648, 650]], null]]],
          [
            5054,
            [
              [648, [2], 400],
              [[[648, null]], null],
            ],
          ],
          [5549, [[1048], [[[682, null]], null]]],
          [
            6225,
            [
              [682, [0, '', '  '], 366],
              [[[685, null]], null],
            ],
          ],
          [
            6765,
            [
              [
                685,
                [0, 'const title = `${post.title} • ${constants.appName}`'],
                366,
              ],
              [[[737, null]], null],
            ],
          ],
          [7000, [[1103], [[[737, 685]], null]]],
        ]),
        ...ch1(3155, 3180, [
          [
            403,
            [
              [777, [0, '', ''], 326],
              [[[778, null]], null],
            ],
          ],
          [
            712,
            [
              [778, [0, '    keywords: post.tags,'], 326],
              [[[802, null]], null],
            ],
          ],
          [
            892,
            [
              [802, [0, '', ''], 326],
              [[[803, null]], null],
            ],
          ],
          [
            1053,
            [
              [803, [0, '    applicationName: constants.appName,'], 326],
              [[[842, null]], null],
            ],
          ],
          [
            1240,
            [
              [842, [0, '', ''], 326],
              [[[843, null]], null],
            ],
          ],
          [
            1428,
            [
              [843, [0, '    authors: post.author.name,'], 326],
              [[[873, null]], null],
            ],
          ],
          [
            1658,
            [
              [873, [0, '', ''], 326],
              [[[874, null]], null],
            ],
          ],
          [
            1911,
            [
              [874, [0, '    creator: post.author.name,'], 326],
              [[[904, null]], null],
            ],
          ],
          [
            2149,
            [
              [904, [0, '', ''], 326],
              [[[905, null]], null],
            ],
          ],
          [
            2390,
            [
              [905, [0, '    category: post.category,'], 326],
              [[[933, null]], null],
            ],
          ],
          [
            2651,
            [
              [933, [0, '', ''], 326],
              [[[934, null]], null],
            ],
          ],
          [
            2911,
            [
              [934, [0, "    generator: 'Next.js',"], 326],
              [[[959, null]], null],
            ],
          ],
          [
            3216,
            [
              [1036, [0, '', ''], 249],
              [[[1037, null]], null],
            ],
          ],
          [
            3579,
            [
              [1037, [0, "      type: 'article',"], 249],
              [[[1059, null]], null],
            ],
          ],
          [
            3865,
            [
              [1059, [0, '', ''], 249],
              [[[1060, null]], null],
            ],
          ],
          [
            4135,
            [
              [1060, [0, '      authors: post.author.name,'], 249],
              [[[1092, null]], null],
            ],
          ],
          [
            4430,
            [
              [1092, [0, '', ''], 249],
              [[[1093, null]], null],
            ],
          ],
          [
            4676,
            [
              [1093, [0, '      emails: post.author.email,'], 249],
              [[[1125, null]], null],
            ],
          ],
          [
            4949,
            [
              [1125, [0, '', ''], 249],
              [[[1126, null]], null],
            ],
          ],
          [
            5234,
            [
              [1126, [0, "      locale: 'en-US',"], 249],
              [[[1148, null]], null],
            ],
          ],
          [
            5600,
            [
              [1148, [0, '', ''], 249],
              [[[1149, null]], null],
            ],
          ],
          [
            5809,
            [
              [1149, [0, "      siteName: 'https://example.com',"], 249],
              [[[1187, null]], null],
            ],
          ],
          [
            6176,
            [
              [1187, [0, '', ''], 249],
              [[[1188, null]], null],
            ],
          ],
          [
            6413,
            [
              [1188, [0, '      tags: post.tags,'], 249],
              [[[1210, null]], null],
            ],
          ],
        ]),
        ...ch1(3293, 3293, [[1239, [[1459], [[[782, 790]], null]]]]),
        ...ch1(3334, 3356, [
          [
            651,
            [
              [792, [9, '[]'], 658],
              [[[794, null]], null],
            ],
          ],
          [
            1382,
            [
              [793, [0, "'C++'"], 659],
              [[[798, null]], null],
            ],
          ],
          [
            1794,
            [
              [798, [0, ", 'Angular'"], 659],
              [[[809, null]], null],
            ],
          ],
          [
            2168,
            [
              [809, [0, ", 'Cats'"], 659],
              [[[817, null]], null],
            ],
          ],
          [
            2564,
            [
              [817, [0, ", 'Memes'"], 659],
              [[[826, null]], null],
            ],
          ],
          [
            2960,
            [
              [826, [0, ", 'News'"], 659],
              [[[834, null]], null],
            ],
          ],
        ]),
        ...ch1(3391, 3391, [
          [
            3382,
            [
              [792, [43, 'post.tags'], 658],
              [[[801, null]], null],
            ],
          ],
        ]),
        ...ch1(3496, 3520, [
          [1197, [[1459], [[[847, 854]], null]]],
          [2466, [[1459], [[[909, 917]], null]]],
        ]),
        ...ch1(3770, 3784, [
          [
            417,
            [
              [1188, [22], 249],
              [[[1188, null]], null],
            ],
          ],
          [
            704,
            [
              [1187, [1], 249],
              [[[1187, null]], null],
            ],
          ],
          [
            937,
            [
              [1149, [38], 249],
              [[[1149, null]], null],
            ],
          ],
          [
            1147,
            [
              [1148, [1], 249],
              [[[1148, null]], null],
            ],
          ],
          [
            1341,
            [
              [1126, [22], 249],
              [[[1126, null]], null],
            ],
          ],
          [
            1542,
            [
              [1125, [1], 249],
              [[[1125, null]], null],
            ],
          ],
          [
            1731,
            [
              [1093, [32], 249],
              [[[1093, null]], null],
            ],
          ],
          [
            1894,
            [
              [1092, [1], 249],
              [[[1092, null]], null],
            ],
          ],
          [
            2081,
            [
              [1060, [32], 249],
              [[[1060, null]], null],
            ],
          ],
          [
            2288,
            [
              [1059, [1], 249],
              [[[1059, null]], null],
            ],
          ],
          [
            2494,
            [
              [1037, [22], 249],
              [[[1037, null]], null],
            ],
          ],
          [
            2718,
            [
              [1036, [1], 249],
              [[[1036, null]], null],
            ],
          ],
          [
            2948,
            [
              [934, [25], 326],
              [[[934, null]], null],
            ],
          ],
          [
            3198,
            [
              [933, [1], 326],
              [[[933, null]], null],
            ],
          ],
          [
            3434,
            [
              [905, [28], 326],
              [[[905, null]], null],
            ],
          ],
          [
            3686,
            [
              [904, [1], 326],
              [[[904, null]], null],
            ],
          ],
          [
            3961,
            [
              [874, [30], 326],
              [[[874, null]], null],
            ],
          ],
          [
            4187,
            [
              [873, [1], 326],
              [[[873, null]], null],
            ],
          ],
          [
            4449,
            [
              [843, [30], 326],
              [[[843, null]], null],
            ],
          ],
          [
            4690,
            [
              [842, [1], 326],
              [[[842, null]], null],
            ],
          ],
          [
            4978,
            [
              [803, [39], 326],
              [[[803, null]], null],
            ],
          ],
          [
            5214,
            [
              [802, [1], 326],
              [[[802, null]], null],
            ],
          ],
          [
            5501,
            [
              [778, [24], 326],
              [[[778, null]], null],
            ],
          ],
          [
            5939,
            [
              [777, [1], 326],
              [[[777, null]], null],
            ],
          ],
        ]),
        ...ch1(3886, 3900, [
          [
            631,
            [
              [861, [0, '', ''], 242],
              [[[862, null]], null],
            ],
          ],
          [
            970,
            [
              [862, [0, '    twitter: {'], 242],
              [[[876, null]], null],
            ],
          ],
          [
            1250,
            [
              [876, [0, '', ''], 242],
              [[[877, null]], null],
            ],
          ],
          [
            1462,
            [
              [877, [0, '      title,'], 242],
              [[[889, null]], null],
            ],
          ],
          [
            1744,
            [
              [889, [0, '', ''], 242],
              [[[890, null]], null],
            ],
          ],
          [
            1978,
            [
              [890, [0, '      description,'], 242],
              [[[908, null]], null],
            ],
          ],
          [
            2270,
            [
              [908, [0, '', ''], 242],
              [[[909, null]], null],
            ],
          ],
          [
            2548,
            [
              [909, [0, '      images: thumbnailUrl,'], 242],
              [[[936, null]], null],
            ],
          ],
          [
            2960,
            [
              [936, [0, '', ''], 242],
              [[[937, null]], null],
            ],
          ],
          [
            3359,
            [
              [937, [0, '    },'], 242],
              [[[943, null]], null],
            ],
          ],
        ]),
        ...ch1(4190, 4210, [
          [
            465,
            [
              [937, [6], 242],
              [[[937, null]], null],
            ],
          ],
          [
            786,
            [
              [936, [1], 242],
              [[[936, null]], null],
            ],
          ],
          [
            1080,
            [
              [909, [27], 242],
              [[[909, null]], null],
            ],
          ],
          [
            1360,
            [
              [908, [1], 242],
              [[[908, null]], null],
            ],
          ],
          [
            1652,
            [
              [890, [18], 242],
              [[[890, null]], null],
            ],
          ],
          [
            1932,
            [
              [889, [1], 242],
              [[[889, null]], null],
            ],
          ],
          [
            2208,
            [
              [877, [12], 242],
              [[[877, null]], null],
            ],
          ],
          [
            2496,
            [
              [876, [1], 242],
              [[[876, null]], null],
            ],
          ],
          [
            2812,
            [
              [862, [14], 242],
              [[[862, null]], null],
            ],
          ],
          [
            3164,
            [
              [861, [1], 242],
              [[[861, null]], null],
            ],
          ],
        ]),
        ...ch1(4282, 4282, [[2200, [[1103], [[[865, 748]], null]]]]),
        ...ch1(4344, 4390, [
          [2662, [[1103], [[[754, 759]], null]]],
          [3939, [[1103], [[[765, 776]], null]]],
        ]),
        ...ch1(4422, 4422, [[7465, [[1103], [[[713, 736]], null]]]]),
        ...ch1(4456, 4456, [[10675, [[1103], [[[865, 748]], null]]]]),
        ...ch1(5255, 5280, [
          [
            727,
            [
              [150, [0, '', ''], 953],
              [[[151, null]], null],
            ],
          ],
          [
            1596,
            [
              [
                151,
                [
                  0,
                  "import { constructMetadata } from '~/lib/metadata/construct-metadata'",
                ],
                953,
              ],
              [[[220, null]], null],
            ],
          ],
          [2371, [[1173], [[[151, 221]], null]]],
          [
            3569,
            [
              [
                592,
                [
                  110,
                  '    return constructMetadata({',
                  "      title: 'Post Not Found',",
                  '    })',
                ],
                471,
              ],
              [[[660, null]], null],
            ],
          ],
          [5841, [[1131], [[[660, 596]], null]]],
          [
            7176,
            [
              [
                666,
                [99, '  const { title, description, thumbnailUrl } = post'],
                366,
              ],
              [[[717, null]], null],
            ],
          ],
          [9273, [[1083], [[[717, 668]], null]]],
          [
            10450,
            [
              [
                719,
                [
                  126,
                  '  return constructMetadata({',
                  '    title,',
                  '    description,',
                  '    images: thumbnailUrl,',
                  '  })',
                ],
                238,
              ],
              [[[806, null]], null],
            ],
          ],
          [12465, [[1044], [[[806, 721]], null]]],
        ]),
        ...ch1(5334, 5334, [
          [
            978,
            [
              [746, [59], 239],
              [[[746, null]], null],
            ],
          ],
        ]),
        ...ch1(5381, 5381, [
          [
            1569,
            [
              [746, [0, '{', "    title: 'Blog',", '  }'], 239],
              [[[770, null]], null],
            ],
          ],
        ]),
        ...ch1(5394, 5394, [
          [
            2188,
            [
              [
                746,
                [24, '{', "    description: 'Some unique description'", '  }'],
                239,
              ],
              [[[794, null]], null],
            ],
          ],
        ]),
        ...ch1(5424, 5424, [
          [
            2755,
            [
              [
                746,
                [
                  48,
                  '{',
                  '    title,',
                  '    description,',
                  '    images: thumbnailUrl,',
                  '  }',
                ],
                239,
              ],
              [[[805, null]], null],
            ],
          ],
        ]),
      ],
    }),
  }),
  new Asset({
    _id: 'lib/react/with-static-params.ts',
    postSlug: 'nextjs-metadata',
    name: 'lib/react/with-static-params.ts',
    content: new AssetContentText({
      initialValue: textFromTemplate(''),
      advances: [
        ...ch1(2334, 2334, [
          [
            841,
            [
              [
                [
                  0,
                  'export type WithStaticParams<F> = F extends () => Promise<',
                  '  ReadonlyArray<infer T>',
                  '>',
                  '  ? { params: Promise<T> }',
                  '  : never',
                  '',
                ],
              ],
              [[[123, 0]], null],
            ],
          ],
        ]),
      ],
    }),
  }),
  new Asset({
    _id: 'examples/json-ld.tsx',
    postSlug: 'nextjs-metadata',
    name: 'examples/json-ld.tsx',
    content: new AssetContentText({
      initialValue:
        textFromTemplate(`import type { Product, WithContext } from 'schema-dts'

export default async function Page({ params }) {
  const product = await getProduct(params.id)

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  )
}
`),
      advances: [],
    }),
  }),
  new Asset({
    _id: 'lib/metadata/construct-metadata.ts',
    postSlug: 'nextjs-metadata',
    name: 'lib/metadata/construct-metadata.ts',
    content: new AssetContentText({
      initialValue: textFromTemplate(`export const constructMetadata = ({
  title,
  description,
  images,
}: { title: string; description: string; images: string }) => {
  return {}
}
`),
      advances: [
        ...ch1(4660, 4675, [
          [
            654,
            [
              [144, [0, '', ''], 4],
              [[[145, null]], null],
            ],
          ],
          [
            939,
            [
              [145, [0, '  '], 4],
              [[[147, null]], null],
            ],
          ],
          [
            1208,
            [
              [144, [0, '', ''], 7],
              [[[145, null]], null],
            ],
          ],
          [
            1533,
            [
              [145, [0, '    title,'], 7],
              [[[155, null]], null],
            ],
          ],
          [
            1781,
            [
              [155, [0, '', ''], 7],
              [[[156, null]], null],
            ],
          ],
          [
            2050,
            [
              [156, [0, '    description,'], 7],
              [[[172, null]], null],
            ],
          ],
          [
            2293,
            [
              [172, [0, '', ''], 7],
              [[[173, null]], null],
            ],
          ],
          [
            2547,
            [
              [173, [0, '    openGraph: {'], 7],
              [[[189, null]], null],
            ],
          ],
          [
            2808,
            [
              [189, [0, '', ''], 7],
              [[[190, null]], null],
            ],
          ],
          [
            3139,
            [
              [190, [0, '    },'], 7],
              [[[196, null]], null],
            ],
          ],
          [
            3384,
            [
              [189, [0, '', ''], 14],
              [[[190, null]], null],
            ],
          ],
          [
            3651,
            [
              [190, [0, '      title,'], 14],
              [[[202, null]], null],
            ],
          ],
          [
            3919,
            [
              [202, [0, '', ''], 14],
              [[[203, null]], null],
            ],
          ],
          [
            4223,
            [
              [203, [0, '      description,'], 14],
              [[[221, null]], null],
            ],
          ],
          [
            4689,
            [
              [221, [0, '', ''], 14],
              [[[222, null]], null],
            ],
          ],
          [
            4853,
            [
              [222, [0, '      images,'], 14],
              [[[235, null]], null],
            ],
          ],
        ]),
        ...ch1(4770, 4785, [
          [
            342,
            [
              [133, [0, '', '  title = ``'], 116],
              [[[146, 133]], null],
            ],
          ],
          [
            733,
            [
              [145, [0, '${title}'], 117],
              [[[153, 145]], null],
            ],
          ],
          [
            1177,
            [
              [153, [0, ' • '], 117],
              [[[156, 153]], null],
            ],
          ],
          [
            1653,
            [
              [156, [0, '${constants.appName}'], 117],
              [[[176, 156]], null],
            ],
          ],
        ]),
        ...ch1(4846, 4855, [
          [
            658,
            [
              [74, [1, '', '  '], 218],
              [[[77, null]], null],
            ],
          ],
          [
            1061,
            [
              [90, [2, '', '  '], 203],
              [[[93, null]], null],
            ],
          ],
          [
            1523,
            [
              [112, [2, '', '  '], 182],
              [[[115, null]], null],
            ],
          ],
          [
            1987,
            [
              [129, [1, '', ''], 167],
              [[[130, null]], null],
            ],
          ],
          [
            2501,
            [
              [82, [8, '?: string | undefined'], 207],
              [[[103, null]], null],
            ],
          ],
        ]),
        ...ch1(4960, 4975, [
          [
            3025,
            [
              [161, [0, 'title ? '], 149],
              [[[169, null]], null],
            ],
          ],
          [
            3555,
            [
              [202, [0, ' : constants.appName'], 116],
              [[[222, null]], null],
            ],
          ],
        ]),
        ...ch1(5030, 5045, [
          [
            558,
            [
              [117, [8, '?: string | undefined'], 213],
              [[[138, null]], null],
            ],
          ],
          [
            1315,
            [
              [58, [0, ' = constants.appDescription'], 293],
              [[[85, null]], null],
            ],
          ],
        ]),
        ...ch1(5115, 5135, [
          [
            489,
            [
              [95, [0, " = '/images/og.png'"], 283],
              [[[114, null]], null],
            ],
          ],
          [
            850,
            [
              [
                119,
                [
                  84,
                  'Partial<{',
                  '  title: string',
                  '  description: string',
                  '  images: string',
                  '}>',
                ],
                194,
              ],
              [[[186, null]], null],
            ],
          ],
          [
            1215,
            [
              [186, [0, ' = {}'], 194],
              [[[191, null]], null],
            ],
          ],
          [1260, [[385], [[[189, 191]], null]]],
        ]),
        ...ch1(5424, 5445, [
          [
            383,
            [
              [115, [0, '', '  '], 270],
              [[[118, null]], null],
            ],
          ],
          [
            720,
            [
              [118, [0, 'canonical,', '  noIndex'], 270],
              [[[138, null]], null],
            ],
          ],
          [
            1040,
            [
              [206, [0, '', '  '], 202],
              [[[209, null]], null],
            ],
          ],
          [
            1365,
            [
              [209, [0, 'canonical: string', '  noIndex: boolean'], 202],
              [[[245, null]], null],
            ],
          ],
          [
            3170,
            [
              [440, [0, '', '    '], 7],
              [[[445, null]], null],
            ],
          ],
          [
            3417,
            [
              [
                445,
                [
                  0,
                  '...(canonical && {',
                  '\t  alternates: {',
                  '\t    canonical,',
                  '\t  },',
                  '\t}),',
                  '\t...(noIndex && {',
                  '\t  robots: {',
                  '\t    index: false,',
                  '\t    follow: false,',
                  '\t  },',
                  '\t}),',
                ],
                7,
              ],
              [[[588, null]], null],
            ],
          ],
        ]),
        ...ch1(8015, 8015, [[1285, [[595], [[[115, 89]], null]]]]),
        ...ch1(8028, 8028, [[1285, [[595], [[[115, 89]], null]]]]),
      ],
    }),
  }),
  new Asset({
    _id: 'app/sitemap.ts',
    postSlug: 'nextjs-metadata',
    name: 'app/sitemap.ts',
    content: new AssetContentText({
      initialValue:
        textFromTemplate(`export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
}
`),
      advances: [
        ...ch1(5705, 5732, [
          [
            606,
            [
              [
                73,
                [0, '', '  const posts = await fetchAllPostSlugsWithDates()'],
                3,
              ],
              [[[124, 73]], null],
            ],
          ],
          [
            1577,
            [
              [
                124,
                [
                  0,
                  '',
                  '',
                  '  return [',
                  '    {',
                  "      url: 'https://example.com',",
                  '    },',
                  '    {',
                  "      url: 'https://example.com/about',",
                  '    },',
                  '    {',
                  "      url: 'https://example.com/blog',",
                  '    },',
                  '    ...posts.map(({ slug, updatedAt }) => ({',
                  '      url: `https://example.com/blog/${slug}`,',
                  '      lastModified: updatedAt,',
                  '    })),',
                  '  ]',
                ],
                3,
              ],
              [[[424, 124]], null],
            ],
          ],
        ]),
        ...ch1(6312, 6340, [
          [
            429,
            [
              [[0, '', ''], 427],
              [[[1, null]], null],
            ],
          ],
          [
            749,
            [
              [1, [0, '', ''], 427],
              [[[2, null]], null],
            ],
          ],
          [
            1113,
            [
              [
                [
                  0,
                  "import type { MetadataRoute } from 'next'",
                  "import { resolveUrl } from '~/lib/metadata/resolvers'",
                ],
                429,
              ],
              [[[95, null]], null],
            ],
          ],
          [
            1456,
            [
              [251, [21, 'resolveUrl()'], 252],
              [[[263, null]], null],
            ],
          ],
          [
            1845,
            [
              [289, [27, "resolveUrl('about')"], 199],
              [[[308, null]], null],
            ],
          ],
          [
            2218,
            [
              [334, [26, "resolveUrl('blog')"], 147],
              [[[352, null]], null],
            ],
          ],
          [
            2571,
            [
              [417, [34, "resolveUrl('blog/${slug}')"], 48],
              [[[443, null]], null],
            ],
          ],
        ]),
        ...ch1(6566, 6723, [
          [981, [[491], [[[451, 463]], null]]],
          [2773, [[491], [[[458, null]], null]]],
        ]),
      ],
    }),
  }),
  new Asset({
    _id: 'lib/metadata/resolvers.ts',
    postSlug: 'nextjs-metadata',
    name: 'lib/metadata/resolvers.ts',
    content: new AssetContentText({
      initialValue: textFromTemplate(''),
      advances: [
        ...ch1(6130, 6163, [
          [
            550,
            [
              [
                [
                  0,
                  "import {} from 'next/dist/lib/metadata/resolvers/resolve-url'",
                  '',
                ],
              ],
              [[[0, 62]], null],
            ],
          ],
          [
            1173,
            [
              [
                8,
                [
                  0,
                  '',
                  '  getSocialImageMetadataBaseFallback,',
                  '  resolveAbsoluteUrlWithPathname,',
                  '',
                ],
                54,
              ],
              [[[81, 8]], null],
            ],
          ],
          [
            1809,
            [
              [
                134,
                [
                  0,
                  '',
                  '',
                  "export const resolveUrl = (url = '/') =>",
                  '  resolveAbsoluteUrlWithPathname()',
                ],
                1,
              ],
              [[[211, 134]], null],
            ],
          ],
          [
            2717,
            [
              [
                210,
                [
                  0,
                  '',
                  '    url,',
                  '    getSocialImageMetadataBaseFallback(null),',
                  '    {',
                  '      trailingSlash: false,',
                  "      pathname: '/',",
                  '      isStaticMetadataRouteFile: false,',
                  '    },',
                  '  ',
                ],
                2,
              ],
              [[[370, 210]], null],
            ],
          ],
        ]),
      ],
    }),
  }),
  new Asset({
    _id: 'app/robots.ts',
    postSlug: 'nextjs-metadata',
    name: 'app/robots.ts',
    content: new AssetContentText({
      initialValue: textFromTemplate(`import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {}
}
`),
      advances: [
        ...ch1(7822, 7834, [
          [
            606,
            [
              [110, [0, '', '    ', '  '], 4],
              [[[115, null]], null],
            ],
          ],
          [
            927,
            [
              [
                115,
                [
                  0,
                  'rules: [',
                  '      {',
                  "        userAgent: '*',",
                  "        allow: ['/'],",
                  '      },',
                  '    ],',
                ],
                7,
              ],
              [[[193, null]], null],
            ],
          ],
        ]),
        ...ch1(7848, 7892, [
          [639, [[200], [[[177, null]], null]]],
          [
            300,
            [
              [177, [0, '', '        '], 23],
              [[[186, null]], null],
            ],
          ],
          [
            600,
            [
              [186, [0, "disallow: ['/api/*']"], 23],
              [[[206, null]], null],
            ],
          ],
          [
            910,
            [
              [178, [28], 23],
              [[[178, null]], null],
            ],
          ],
          [
            1200,
            [
              [177, [1], 23],
              [[[177, null]], null],
            ],
          ],
        ]),
        ...ch1(7894, 7920, [
          [
            481,
            [
              [41, [0, '', ''], 159],
              [[[42, null]], null],
            ],
          ],
          [
            1206,
            [
              [
                42,
                [0, "import { resolveUrl } from '~/lib/metadata/resolvers'"],
                159,
              ],
              [[[95, null]], null],
            ],
          ],
          [
            1641,
            [
              [247, [0, '', '    '], 7],
              [[[252, null]], null],
            ],
          ],
          [
            2213,
            [
              [252, [0, "sitemap: resolveUrl('sitemap.xml'),"], 7],
              [[[287, null]], null],
            ],
          ],
        ]),
      ],
    }),
  }),
]
