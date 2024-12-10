import { Array, Function, Option, Schema, pipe } from 'effect'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { readableDate } from '~/lib/date/readable-date'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import { defaultEditorExtensions } from '~/lib/pm/default-editor-extensions'
import { StaticEditorContent } from '~/lib/pm/static-editor-content'
import { cx } from '~/lib/react/cx'
import type { WithStaticParams } from '~/lib/react/with-static-params'
import { BackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { Post, posts } from '~/model/post'
import { PostContent } from './_content'
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

  const post = posts.find((it) => it.slug === slug)

  if (!post) {
    return notFound()
  }

  const { title, lead, date, tags, posterUrl, captions } = post

  const posterImageProps = {
    src: posterUrl,
    sizes: defaultImageSizes,
    alt: `${title}'s poster`,
  } satisfies ImageProps

  const captionsCx = cx('mx-auto typography w-full drop-shadow-md')

  const postCaptionsLoading = (
    <StaticEditorContent
      className={captionsCx}
      content={captions}
      extensions={defaultEditorExtensions}
    />
  )
  const PostCaptions = dynamic(
    () => import('./_captions').then((m) => m.PostCaptions),
    {
      loading: () => postCaptionsLoading,
    },
  )

  const PostLayout = dynamic(() =>
    import('./_layout').then((m) => m.PostLayout),
  )

  return (
    <PostPageProvider postEncoded={Schema.encodeSync(Post)(post)}>
      <article className={cx(mono.variable, 'flex flex-col gap-16')}>
        <BackgroundEffect {...posterImageProps} />
        <header className="container flex flex-col justify-between lg:flex-row ~gap-6/10 ~p-4/5 drop-shadow-md">
          <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
            <Image
              {...posterImageProps}
              fill
              className="object-cover rounded-4xl shadow-inner"
              priority
            />
          </aside>
          <section className="flex-1 ~space-y-4/6 ~py-0/4">
            <div className="space-y-1">
              <small className="text-accent-11 font-bold tracking-wide ~text-sm/lg">
                {readableDate(date)}
              </small>
              <h1 className="~text-4xl/5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
                {title}
              </h1>
            </div>

            <p className="~text-lg/xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
              {lead}
            </p>

            {Option.some(tags).pipe(
              Option.filter(Array.isNonEmptyReadonlyArray),
              Option.andThen(
                Array.map((tag) => ({
                  name: tag,
                  Icon: matchTagIcon(tag),
                })),
              ),
              Option.andThen((tags) => (
                <div className="flex justify-between gap-8 items-center">
                  <ul className="flex flex-wrap ~gap-2/4 ~text-sm/base font-bold tracking-wide text-accent-11 *:my-0.5">
                    {tags.map((tag) => (
                      <li key={tag.name}>
                        <div
                          className={cx(
                            shadowInsetStyles,
                            'flex ~gap-1/1.5 items-center bg-accent-7/35 border border-accent-8 rounded-full after:rounded-full px-3 py-1',
                          )}
                        >
                          {tag.Icon && <tag.Icon className="~size-4/5" />}
                          {tag.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )),
              Option.getOrNull,
            )}
          </section>
        </header>
        <PostContent
          captions={<PostCaptions className={captionsCx} />}
          layout={<PostLayout />}
        />
      </article>
    </PostPageProvider>
  )
}
