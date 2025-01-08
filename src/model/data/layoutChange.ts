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
  lc1(1608, '"app/blog/[slug]/page.tsx"'),
  lc1(2320, '"lib/react/with-static-params.ts"'),
  lc1(2410, '"app/blog/[slug]/page.tsx"'),
  lc1(2762, '"nextjs-docs-deduplication"'),
  lc1(2958, '"app/blog/[slug]/page.tsx"'),
  lc1(3067, '"metadata-fields"'),
  lc1(3147, '"app/blog/[slug]/page.tsx"'),
  lc1(3534, '"examples/json-ld.tsx"'),
  lc1(3652, '"rich-results"'),
  lc1(3735, '"app/blog/[slug]/page.tsx"'),
  lc1(4627, '"lib/metadata/construct-metadata.ts"'),
  lc1(5244, '"app/blog/[slug]/page.tsx"'),
  lc1(5412, '"lib/metadata/construct-metadata.ts"'),
  lc1(5656, '"app/sitemap.ts"'),
  lc1(5947, '"nextjs-docs-metadata-base"'),
  lc1(6065, '"lib/metadata/resolvers.ts"'),
  lc1(6305, '"app/sitemap.ts"'),
  lc1(7024, ''),
  lc1(7771, '"app/robots.ts"'),
  lc1(8015, '"lib/metadata/construct-metadata.ts"'),
  lc1(8274, ''),
  lc1(8735, ''),
  lc1(9120, '"lib/metadata/construct-metadata.ts"'),
  lc1(9232, ''),
  lc1(9350, '"icons-too-much"'),
  lc1(9767, '"icon-180"'),
  lc1(9873, '"real-favicon-generator-download"'),
  lc1(9957, '"icons-app-folder"'),
  lc1(10437, ''),
]
