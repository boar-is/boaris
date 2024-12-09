import { Array, Function, Option, Schema, pipe } from 'effect'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import type { WithStaticParams } from '~/lib/react/with-static-params'
import { Post, posts } from '~/model/post'
import { PostScrolling } from './_post-scrolling'
import { PostPageProvider } from './provider'

export async function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: WithStaticParams<typeof generateStaticParams>): Promise<Metadata> {
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
      Function.constant(
        constructMetadata({
          title: 'Post Not Found',
        }),
      ),
    ),
  )
}

export default async function PostPage({
  params,
}: WithStaticParams<typeof generateStaticParams>) {
  const { slug } = await params

  return pipe(
    posts,
    Array.findFirst((it) => it.slug === slug),
    Option.andThen(Schema.encodeOption(Post)),
    Option.andThen((postEncoded) => (
      <PostPageProvider postEncoded={postEncoded}>
        <PostScrolling />
      </PostPageProvider>
    )),
    Option.getOrElse(() => notFound()),
  )
}
