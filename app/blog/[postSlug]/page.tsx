import { notFound } from 'next/navigation'
import { JetBrainsMono } from '~/lib/fonts'
import { posts } from '~/lib/posts'

export async function generateStaticParams() {
  return Object.keys(posts).map((postSlug) => ({ postSlug }))
}

export default async function BlogPostPage({
  params,
}: { params: { postSlug: string } }) {
  const post = posts[params.postSlug]

  if (!post) {
    notFound()
  }

  return (
    <div className={JetBrainsMono.variable}>
      <span className="font-mono">{post.name}</span>
    </div>
  )
}
