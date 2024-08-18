import { notFound } from 'next/navigation'
import { cx } from '~/lib/cx'
import { postDocs } from '~/lib/db/posts'
import { JetBrainsMono } from '~/lib/fonts'
import { PostService } from '~/lib/services/post.service'
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
  const post = PostService.getBlogPost(postSlug)

  if (!post) {
    notFound()
  }

  return (
    <article className={cx(JetBrainsMono.variable, 'flex flex-col gap-10')}>
      <aside />
      <header className="container max-w-prose">
        <hgroup>
          <h1>{post.title}</h1>
          <p>{post.lead}</p>
        </hgroup>
      </header>
      <section className="container typography">
        <BlogCaptions content={post.captions} />
      </section>
    </article>
  )
}
