import { notFound } from 'next/navigation'
import { AssetRepository } from '~/lib/db/assets'
import { PostRepository } from '~/lib/db/posts'
import { RevisionAssetRepository } from '~/lib/db/revision-assets'
import { JetBrainsMono } from '~/lib/fonts'
import { BlogCaptions } from './_/blog-captions'

export async function generateStaticParams() {
  return PostRepository.findPublishedByProjectId('boaris').map((it) => ({
    postSlug: it.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: { params: { postSlug: string } }) {
  const post = PostRepository.findOneBySlug(params.postSlug)

  if (!post?.publishedRevisionId) {
    notFound()
  }

  const assets = AssetRepository.findMany(
    RevisionAssetRepository.findByRevisionId(post?.publishedRevisionId).map(
      (it) => it.assetId,
    ),
  )

  const captions = assets.find((it) => it.type === 'Captions')

  return (
    <div className={JetBrainsMono.variable}>
      <div className="container typography">
        {captions && <BlogCaptions content={captions.doc} />}
      </div>
    </div>
  )
}
