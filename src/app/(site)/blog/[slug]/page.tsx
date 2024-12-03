import { Array, Option, Schema, pipe } from 'effect'
import { constant } from 'effect/Function'
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

  return pipe(
    posts,
    Array.findFirst((it) => it.slug === slug),
    Option.andThen(({ title, lead, description }) =>
      constructMetadata({
        title,
        description: Option.getOrElse(description, () => lead),
        canonical: `/blog/${slug}`,
      }),
    ),
    Option.getOrElse(
      constant(
        constructMetadata({
          title: 'Post Not Found',
        }),
      ),
    ),
  )
}

export default async function PostPage({
  params,
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const { slug } = await params

  return pipe(
    posts,
    Array.findFirst((it) => it.slug === slug),
    Option.andThen(Schema.encodeOption(Post)),
    Option.andThen((post) => <PostPageClient post={post} />),
    Option.getOrElse(() => notFound()),
  )
}
