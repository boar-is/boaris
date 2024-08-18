import { notFound } from 'next/navigation'
import { JetBrainsMono } from '~/lib/fonts'
import { posts } from '~/lib/posts'
import { BlogEditor } from './_/blog-editor'

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
      <div className="container typography">
        <BlogEditor />
      </div>
    </div>
  )
}
