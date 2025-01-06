import type { Metadata } from 'next'
import { workspace } from '~/model/data/workspace'

export const constructMetadata = ({
  title,
  description = workspace.description,
  images = '/images/og.png',
  canonical,
  noIndex,
}: Partial<{
  title: string
  description: string
  images: string
  canonical: string
  noIndex: boolean
}> = {}): Metadata => {
  title = title ? `${title} • ${workspace.name}` : workspace.name
  return {
    title,
    description,
    openGraph: { title, description, images },
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
