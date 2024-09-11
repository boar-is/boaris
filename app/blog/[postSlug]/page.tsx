import { notFound } from 'next/navigation'
import { postDocs } from '~/lib/model/docs/posts'

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
  const post = postDocs[0]

  if (!post) {
    notFound()
  }

  return (
    <main>
      <video autoPlay muted loop playsInline width="1000">
        <source
          src="/deferred-example/shadow-palette-initial.mp4"
          type="video/mp4"
        />
      </video>
    </main>
  )
}
