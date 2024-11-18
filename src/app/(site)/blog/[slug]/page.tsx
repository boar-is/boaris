import { Option, Schema } from 'effect'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { Post, posts } from '~/model/post'
import { PostPageClient } from './page.client'

export async function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PropsWithStaticParams<typeof generateStaticParams>): Promise<Metadata> {
  const { slug } = await params

  const post = posts.find((it) => it.slug === slug)

  if (!post) {
    return constructMetadata({
      title: 'Post Not Found',
    })
  }

  const { title, lead, description } = post

  return constructMetadata({
    title,
    description: description.pipe(Option.getOrElse(() => lead)),
    canonical: `/blog/${slug}`,
  })
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
