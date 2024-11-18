import type { Metadata } from 'next'
import { baseUrl } from '~/lib/metadata/baseUrl'
import { workspace } from '~/model/workspace'

export const constructMetadata = ({
  title,
  description = workspace.description,
  canonical,
  noIndex,
}: {
  title?: string | undefined
  description?: string | undefined
  canonical?: string | undefined
  noIndex?: boolean | undefined
} = {}): Metadata => {
  title = title ? `${title} • ${workspace.name}` : workspace.name
  const images = ['/images/og.png']

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: { title, description, images },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      creator: '@MrBoaris',
    },
    creator: 'Boris',
    publisher: 'Boris',
    authors: [
      {
        name: 'Boris',
        url: workspace.socialLinks.find((it) => it.label === 'GitHub')!.label,
      },
    ],
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
