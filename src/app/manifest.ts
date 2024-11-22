import type { MetadataRoute } from 'next'
import { viewport } from '~/lib/metadata/viewport'
import { workspace } from '~/model/workspace'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: workspace.name,
    short_name: workspace.name,
    description: workspace.description,
    start_url: '/',
    display: 'standalone',
    background_color: viewport.themeColor,
    theme_color: viewport.themeColor,
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
