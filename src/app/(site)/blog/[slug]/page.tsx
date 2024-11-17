import { Schema } from 'effect'
import { notFound } from 'next/navigation'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { Post, posts } from '~/model/post'
import { PostPageClient } from './page.client'

export async function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

export default async function PostPage({
  params,
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const { slug } = await params

  const post = posts.find((it) => it.slug === slug)

  if (!post) {
    notFound()
  }

  return <PostPageClient post={Schema.encodeSync(Post)(post)} />
}
