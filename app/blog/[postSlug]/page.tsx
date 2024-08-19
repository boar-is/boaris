import { notFound } from 'next/navigation'
import { getBlogPost } from '~/lib/api/get-blog-post'
import { postDocs } from '~/lib/db/posts'
import { BlogPostPageClient } from './page.client'

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

  return <BlogPostPageClient post={post} />
}
