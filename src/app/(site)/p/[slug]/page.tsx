import { Array, Function, Option, Schema, pipe } from 'effect'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense, lazy } from 'react'
import { PostLayout } from '~/app/(site)/p/[slug]/_layout'
import { readableDate } from '~/lib/date/readable-date'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import { BlurFade } from '~/lib/motion/blur-fade'
import { StaticEditorContent } from '~/lib/pm/static-editor-content'
import { cx } from '~/lib/react/cx'
import type { WithStaticParams } from '~/lib/react/with-static-params'
import { BackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { Asset, assetRepository } from '~/model/asset'
import { Captions, captionsRepository } from '~/model/captions'
import { LayoutChange, layoutChangeRepository } from '~/model/layoutChange'
import { postRepository } from '~/model/post'
import { PostContent } from './_page-content'
import { PostSubscriptionSection } from './_subscription-section'

const PostCaptions = lazy(() => import('./_captions'))

export const experimental_ppr = true

export async function generateStaticParams() {
  return postRepository.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: WithStaticParams<typeof generateStaticParams>): Promise<Metadata> {
  const { slug } = await params

  return pipe(
    postRepository,
    Array.findFirst((it) => it.slug === slug),
    Option.andThen(({ title, lead, description }) =>
      constructMetadata({
        title,
        description: Option.getOrElse(description, () => lead),
        canonical: `/p/${slug}`,
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

  const post = postRepository.find((it) => it.slug === slug)

  if (!post) {
    return notFound()
  }

  const captions = captionsRepository.find((it) => it.postSlug === slug)

  if (!captions) {
    return notFound()
  }

  const assetsEncoded = new Promise(
    (resolve: (value: ReadonlyArray<typeof Asset.Encoded>) => void) =>
      resolve(
        Schema.encodeSync(Schema.Array(Asset))(
          assetRepository.filter((it) => it.postSlug === slug),
        ),
      ),
  )
  const layoutChangesEncoded = new Promise(
    (resolve: (value: ReadonlyArray<typeof LayoutChange.Encoded>) => void) =>
      resolve(
        Schema.encodeSync(Schema.Array(LayoutChange))(
          layoutChangeRepository.filter((it) => it.postSlug === slug),
        ),
      ),
  )

  const { title, lead, date, tags, posterUrl, interpolation } = post

  const posterImageProps = {
    src: posterUrl,
    sizes: defaultImageSizes,
    alt: `${title}'s poster`,
  } satisfies ImageProps

  const captionsCx = cx('mx-auto typography w-full drop-shadow-md')

  return (
    <article className={cx(mono.variable, 'flex flex-col ~gap-6/8')}>
      <BackgroundEffect {...posterImageProps} />
      <header className="container flex flex-col justify-between lg:flex-row ~gap-6/10 ~p-4/5 drop-shadow-md">
        <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
          <Image
            {...posterImageProps}
            fill
            className="object-cover ~rounded-2xl/4xl shadow-inner"
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
        interpolation={interpolation}
        captionsSlot={
          <Suspense
            fallback={
              <StaticEditorContent
                content={captions.content}
                className={captionsCx}
              />
            }
          >
            <PostCaptions
              captionsEncoded={Schema.encodeSync(Captions)(captions)}
              className={captionsCx}
            />
          </Suspense>
        }
        layoutSlot={
          <Suspense fallback={null}>
            <PostLayout
              assetsEncoded={assetsEncoded}
              layoutChangesEncoded={layoutChangesEncoded}
            />
          </Suspense>
        }
      />
      <BlurFade inView>
        <div className="container">
          <PostSubscriptionSection />
        </div>
      </BlurFade>
    </article>
  )
}
