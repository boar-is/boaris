import { Schema } from 'effect'
import { PostLayoutContent } from '~/app/(site)/p/[slug]/_layout-content'
import { Asset, assetRepository } from '~/model/asset'
import { LayoutChange, layoutChangeRepository } from '~/model/layoutChange'

export function PostLayout({ slug }: { slug: string }) {
  const assets = assetRepository.filter((it) => it.postSlug === slug)
  const layoutChanges = layoutChangeRepository.filter(
    (it) => it.postSlug === slug,
  )

  return (
    <PostLayoutContent
      assetsEncoded={Schema.encodeSync(Schema.Array(Asset))(assets)}
      layoutChangesEncoded={Schema.encodeSync(Schema.Array(LayoutChange))(
        layoutChanges,
      )}
    />
  )
}
