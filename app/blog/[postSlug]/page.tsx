import { notFound } from 'next/navigation'
import { cx } from '~/lib/cx'
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

  if (!captions) {
    throw new Error(
      `Post ${post.slug} does not have captions asset for the scrolling mode.`,
    )
  }

  return (
    <article className={cx(JetBrainsMono.variable, 'flex flex-col gap-10')}>
      <aside />
      <header className="container max-w-prose">
        <hgroup>
          <h1>{post.title}</h1>
          <p>{post.lead ?? post.description}</p>
        </hgroup>
      </header>
      <section className="container typography">
        <BlogCaptions content={captions.doc} />
      </section>
    </article>
  )
}
