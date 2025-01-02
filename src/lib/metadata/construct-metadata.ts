import type { Metadata } from 'next'
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
  const creator = '@MrBoaris'
  const images = '/images/og.png'

  return {
    title,
    description,
    openGraph: { title, description, images, type: 'website' },
    twitter: {
      title,
      description,
      images,
      card: 'summary_large_image',
      creator,
      site: creator,
    },
    creator,
    publisher: creator,
    authors: [
      {
        name: creator,
        url: workspace.socialLinks.find((it) => it.label === 'GitHub')?.href,
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
