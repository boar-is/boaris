import type { Metadata } from 'next'
import { workspace } from '~/model/data/workspace'
import { resolveUrl } from './resolvers'

export const constructMetadata = ({
  title,
  description = workspace.description,
  canonical,
  noIndex,
}: Partial<{
  title: string
  description: string
  canonical: string
  noIndex: boolean
}> = {}): Metadata => {
  title = title ? `${title} • ${workspace.name}` : workspace.name
  return {
    title,
    description,
    openGraph: { title, description },
    ...(canonical && {
      alternates: {
        canonical: resolveUrl(canonical),
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
