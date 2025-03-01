import { type OffsetChange, shiftedOffsetChanges } from '~/lib/cm/offset-change'
import { textFromTemplate } from '~/lib/cm/text'
import { pp1 } from '~/model/_no-db-helpers'
import type { Asset } from '~/model/asset'

const ch1 = (
  from: number,
  to: number,
  changes: ReadonlyArray<typeof OffsetChange.Encoded>,
) => shiftedOffsetChanges(changes)(pp1(from), pp1(to))

export const assetRepository: ReadonlyArray<typeof Asset.Encoded> = [
  {
    _id: 'app-icons',
    postSlug: 'nextjs-metadata',
    name: 'app-icons.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/app-icons.png',
      caption: undefined,
      alt: 'A file tree with selected icons',
    },
  },
  {
    _id: 'basic-fields',
    postSlug: 'nextjs-metadata',
    name: 'basic-fields.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/basic-fields.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about Basic Fields',
    },
  },
  {
    _id: 'deduplication',
    postSlug: 'nextjs-metadata',
    name: 'deduplication.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/deduplication.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about deduplication',
    },
  },
  {
    _id: 'icon-180',
    postSlug: 'nextjs-metadata',
    name: 'icon-180.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/icon-180.png',
      caption: undefined,
      alt: 'An icon in a 180x180 frame',
    },
  },
  {
    _id: 'icons-too-much',
    postSlug: 'nextjs-metadata',
    name: 'icons-too-much.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/icons-too-much.png',
      caption: undefined,
      alt: 'An archive with a lot of redundant icons',
    },
  },
  {
    _id: 'inter-features',
    postSlug: 'nextjs-metadata',
    name: 'inter-features.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/inter-features.png',
      caption: undefined,
      alt: 'A screenshot from Inter website about its features',
    },
  },
  {
    _id: 'metadata-fields',
    postSlug: 'nextjs-metadata',
    name: 'metadata-fields.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/metadata-fields.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about metadata fields',
    },
  },
  {
    _id: 'no-public-caching',
    postSlug: 'nextjs-metadata',
    name: 'no-public-caching.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/no-public-caching.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about no public caching',
    },
  },
  {
    _id: 'opengraph-images',
    postSlug: 'nextjs-metadata',
    name: 'opengraph-images.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/opengraph-images.png',
      caption: 'Next.js Docs',
      alt: 'A file tree with selected OpenGraph images',
    },
  },
  {
    _id: 'real-favicon-generator',
    postSlug: 'nextjs-metadata',
    name: 'real-favicon-generator.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/real-favicon-generator.png',
      caption: 'RealFaviconGenerator',
      alt: 'A screenshot of RealFaviconGenerator',
    },
  },
  {
    _id: 'real-favicon-generator-download',
    postSlug: 'nextjs-metadata',
    name: 'real-favicon-generator-download.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/real-favicon-generator-download.png',
      caption: 'Download the app files',
      alt: 'A screenshot of the download page of RealFaviconGenerator',
    },
  },
  {
    _id: 'real-favicon-generator-upload',
    postSlug: 'nextjs-metadata',
    name: 'real-favicon-generator-upload.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/real-favicon-generator-upload.png',
      caption: 'Upload the app files',
      alt: 'A screenshot of the upload page of RealFaviconGenerator',
    },
  },
  {
    _id: 'rich-results',
    postSlug: 'nextjs-metadata',
    name: 'rich-results.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/rich-results.png',
      caption: 'Google Rich Results Carousel',
      alt: 'Google Rich Results Carousel.',
    },
  },
  {
    _id: 'static-rendering',
    postSlug: 'nextjs-metadata',
    name: 'static-rendering.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/static-rendering.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about static rendering',
    },
  },
  {
    _id: 'url-default',
    postSlug: 'nextjs-metadata',
    name: 'url-default.png',
    content: {
      _tag: 'AssetContentImageStatic',
      href: '/assets/nextjs-metadata/url-default.png',
      caption: 'Next.js Docs',
      alt: 'A screenshot from Next.js Docs about default URL resolution',
    },
  },
  {
    _id: 'app/basic-metadata/page.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/basic-metadata/page.tsx',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: '...',
  description: '...',
}
 
export default function Page() {}        
`),
      advances: [],
    },
  },
  {
    _id: 'app/manifest.ts',
    postSlug: 'nextjs-metadata',
    name: 'app/manifest.ts',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: 'https://example.com/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}   
`),
      advances: [],
    },
  },
  {
    _id: 'app/blog/[slug]/page.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/blog/[slug]/page.tsx',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const recentPosts = await fetchRecentPosts()
  return recentPosts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = await fetchPostMetadataBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      openGraph: {
        title: 'Post Not Found',
      },
      twitter: {
        title: 'Post Not Found',
      },
    }
  }

  return {
    title: post.title,
    description: post.description,
    generator: 'Next.js',
    applicationName: 'Next.js',
    keywords: ['Next.js', 'React', 'JavaScript'],
    authors: [{ name: 'Seb' }, { name: 'Josh', url: 'https://nextjs.org' }],
    creator: 'Jiachi Liu',
    publisher: 'Sebastian Markbåge',
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.thumbnailUrl,
          type: 'image/png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.thumbnailUrl,
          type: 'image/png',
          width: 1200,
          height: 630,
        },
      ],
      card: 'summary_large_image',
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await fetchPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  return <article>{post.title}</article>
}

`),
      advances: [],
    },
  },
  {
    _id: 'app/index.html',
    postSlug: 'nextjs-metadata',
    name: 'app/index.html',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`<title>Next.js</title>
<meta name="description" content="The React Framework for the Web" />

<meta property="og:title" content="Next.js">
<meta property="og:description" content="The React Framework for the Web" />

<meta name="twitter:title" content="Next.js">
<meta property="twitter:description" content="The React Framework for the Web" />
`),
      advances: [],
    },
  },
  {
    _id: 'app/json-ld/page.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/json-ld/page.tsx',
    content: {
      _tag: 'AssetContentText',
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
    },
  },
  {
    _id: 'app/layout.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/layout.tsx',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`export const metadata: Metadata = {
  title: {
    template: '%s • Boaris',
    default: 'Boaris',
  },
  description: 'Some description',
}
`),
      advances: [],
    },
  },
  {
    _id: 'app/blog/[slug]/opengraph-image.tsx',
    postSlug: 'nextjs-metadata',
    name: 'app/blog/[slug]/opengraph-image.tsx',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await fetchPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  return new ImageResponse(
    <div>
      {post.title}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await fetch(
            new URL('~/lib/media/fonts/files/Inter-Bold.ttf', import.meta.url),
          ).then((res) => res.arrayBuffer()),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )
}
`),
      advances: [],
    },
  },
  {
    _id: 'lib/metadata/resolvers.ts',
    postSlug: 'nextjs-metadata',
    name: 'lib/metadata/resolvers.ts',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import {
  getSocialImageMetadataBaseFallback,
  resolveAbsoluteUrlWithPathname,
} from 'next/dist/lib/metadata/resolvers/resolve-url'

export const resolveUrl = (url = '/') =>
  resolveAbsoluteUrlWithPathname(
    url,
    getSocialImageMetadataBaseFallback(null),
    {
      trailingSlash: false,
      pathname: '/',
      isStaticMetadataRouteFile: false,
    },
  )        
`),
      advances: [],
    },
  },
  {
    _id: 'app/sitemap.ts',
    postSlug: 'nextjs-metadata',
    name: 'app/sitemap.ts',
    content: {
      _tag: 'AssetContentText',
      initialValue:
        textFromTemplate(`export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPostSlugsWithDates()

  return [
    {
      url: 'https://example.com',
    },
    {
      url: 'https://example.com/about',
    },
    {
      url: 'https://example.com/blog',
    },
    ...posts.map(({ slug, updatedAt }) => ({
      url: \`https://example.com/blog/\${slug}\`,
      lastModified: updatedAt,
    })),
  ]
}
`),
      advances: [],
    },
  },
  {
    _id: 'app/robots.ts',
    postSlug: 'nextjs-metadata',
    name: 'app/robots.ts',
    content: {
      _tag: 'AssetContentText',
      initialValue: textFromTemplate(`import type { MetadataRoute } from 'next'
import { resolveUrl } from '~/lib/metadata/resolvers'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/*'],
      },
    ],
    sitemap: resolveUrl('sitemap.xml'),
  }
}
`),
      advances: [],
    },
  },
]
