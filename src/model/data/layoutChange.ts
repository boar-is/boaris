import { pp1 } from '~/model/_no-db-helpers'
import type { LayoutChange } from '~/model/layoutChange'

const lc1 = (pos: number, areas: string): typeof LayoutChange.Encoded => ({
  postSlug: 'nextjs-metadata',
  offset: pp1(pos),
  areas,
})

export const layoutChangeRepository: ReadonlyArray<
  typeof LayoutChange.Encoded
> = [
  lc1(192, '"app/basic-metadata/page.tsx"'),
  lc1(500, '"app/manifest.ts"'),
  lc1(666, ''),
  lc1(1008, '"app/blog/[slug]/page.tsx"'),
  lc1(1655, '"metadata-fields"'),
  lc1(1833, '"app/index.html"'),
  lc1(2178, '"app/blog/[slug]/page.tsx"'),
  lc1(2428, '"basic-fields"'),
  lc1(2671, '"app/json-ld/page.tsx"'),
  lc1(2734, '"rich-results"'),
  lc1(2864, '"app/blog/[slug]/page.tsx"'),
  lc1(3122, '"app/layout.tsx"'),
  lc1(3497, '"app/blog/[slug]/page.tsx"'),
  lc1(3905, '"deduplication"'),
  lc1(4108, '"app/blog/[slug]/page.tsx"'),
  lc1(4360, '"no-public-caching"'),
  lc1(4525, '"static-rendering"'),
  lc1(4767, '"opengraph-images"'),
  lc1(5009, '"app/blog/[slug]/opengraph-image.tsx"'),
  lc1(5435, '"inter-features"'),
  lc1(5635, '"app/blog/[slug]/opengraph-image.tsx"'),
  lc1(6305, '"app/p/[slug]/opengraph-image.tsx"'),
  lc1(6540, '"icons-too-much"'),
  lc1(6765, '"app/manifest.ts"'),
  lc1(6965, '"icon-180"'),
  lc1(7032, '"real-favicon-generator"'),
  lc1(7065, '"real-favicon-generator-upload"'),
  lc1(7085, '"real-favicon-generator-download"'),
  lc1(7163, '"app-icons"'),
  lc1(7520, '"app/sitemap.ts"'),
  lc1(7793, '"url-default"'),
  lc1(7900, '"lib/metadata/resolvers.ts"'),
  lc1(8112, '"app/sitemap.ts"'),
  lc1(8810, ''),
  lc1(9505, '"app/robots.ts"'),
  lc1(9710, ''),
]
