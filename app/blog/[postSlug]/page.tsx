import { notFound } from 'next/navigation'
import { Image } from '~/components/image'
import { getBlogPost } from '~/lib/api/get-blog-post'
import { cx } from '~/lib/cx'
import { postDocs } from '~/lib/db/posts'
import { JetBrainsMono } from '~/lib/fonts'
import { BlogCaptions } from './_/blog-captions'

export async function generateStaticParams() {
  return postDocs
    .filter((it) => it.publishedRevisionId)
    .map((it) => ({
      postSlug: it.slug,
    }))
}

export default async function BlogPostPage({
  params: { postSlug },
}: { params: { postSlug: string } }) {
  const post = await getBlogPost(postSlug)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <article className={cx(JetBrainsMono.variable, 'container max-w-prose')}>
        {post.thumbnailSrc && (
          <aside className="relative aspect-video">
            <Image
              src={post.thumbnailSrc}
              alt={`${post.title} thumbnail's blur`}
              fill
              className="absolute object-cover rounded-2xl max-w-full max-h-full blur-3xl scale-90 pointer-events-none transform-gpu"
            />
            <Image
              src={post.thumbnailSrc}
              alt={`${post.title}'s thumbnail`}
              fill
              className="object-cover rounded-2xl"
            />
          </aside>
        )}
        <header className="mt-6 mb-12">
          <hgroup className="space-y-4">
            <h1 className="text-4xl md:text-5xl text-balance font-semibold text-gray-12 tracking-tighter">
              {post.title}
            </h1>
            <p className="text-gray-10 font-medium text-xl md:text-2xl tracking-tight text-pretty">
              {post.lead}
            </p>
          </hgroup>
        </header>
        <section className="typography">
          <BlogCaptions content={post.captions} />
        </section>
      </article>
    </div>
  )
}
