'use client'

import dynamic from 'next/dynamic'
import 'tldraw/tldraw.css'
import { getAssetUrlsByMetaUrl } from '@tldraw/assets/urls'

const Tldraw = dynamic(() => import('tldraw').then((m) => m.Tldraw), {
  ssr: false,
})

const assetUrls = getAssetUrlsByMetaUrl()

export default function TldrawLabsPage() {
  return (
    <div className="container h-[400px]">
      <Tldraw assetUrls={assetUrls} />
    </div>
  )
}
