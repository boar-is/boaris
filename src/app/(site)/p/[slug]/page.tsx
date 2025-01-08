import { Array, Option, Schema } from 'effect'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ButtonJumpToTop } from '~/app/(site)/p/[slug]/_button-jump-to-top'
import { readableDate } from '~/lib/date/readable-date'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { cx } from '~/lib/react/cx'
import type { WithStaticParams } from '~/lib/react/with-static-params'
import { resolveUrl } from '~/lib/routing/resolvers'
import { BackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { simulateReq } from '~/model/_no-db-helpers'
import { Asset } from '~/model/asset'
import { Captions } from '~/model/captions'
import { assetRepository } from '~/model/data/asset'
import { captionsRepository } from '~/model/data/captions'
import { layoutChangeRepository } from '~/model/data/layoutChange'
import { postRepository } from '~/model/data/post'
import { LayoutChange } from '~/model/layoutChange'
import PostCaptions from './_captions'
import { PostDisclaimerSection } from './_disclaimer-section'
import { PostContent } from './_page-content'
import { PostSubscriptionSection } from './_subscription-section'

const PostLayout = dynamic(() => import('./_layout').then((m) => m.PostLayout))

export async function generateStaticParams() {
  return postRepository.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: WithStaticParams<typeof generateStaticParams>): Promise<Metadata> {
  const { slug } = await params

  const post = await simulateReq(() =>
    postRepository.find((it) => it.slug === slug),
  )

  if (!post) {
    return notFound()
  }

  return {
    title: post.title,
    description: Option.getOrElse(post.description, () => post.lead),
    alternates: {
      canonical: resolveUrl(`/p/${slug}`),
    },
  }
}

export default async function PostPage({
  params,
}: WithStaticParams<typeof generateStaticParams>) {
  const { slug } = await params

  const post = await simulateReq(() =>
    postRepository.find((it) => it.slug === slug),
  )

  if (!post) {
    return notFound()
  }

  const captions = captionsRepository.find((it) => it.postSlug === slug)!

  const assetsEncoded = simulateReq(() =>
    Schema.encodeSync(Schema.Array(Asset))(
      assetRepository.filter((it) => it.postSlug === slug),
    ),
  )

  const layoutChangesEncoded = simulateReq(() =>
    Schema.encodeSync(Schema.Array(LayoutChange))(
      layoutChangeRepository.filter((it) => it.postSlug === slug),
    ),
  )

  const { title, lead, date, tags, posterUrl, interpolation, twitterUrl } = post

  const posterImageProps = {
    src: posterUrl,
    sizes: defaultImageSizes,
    alt: `${title}'s poster`,
    quality: 80,
  } satisfies ImageProps

  return (
    <article className={cx(mono.variable, 'flex flex-col ~gap-10/16')}>
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
      <BlurFade inView>
        <div className="container">
          <PostDisclaimerSection
            slug={slug}
            intent="Check out this interactive blog post from @MrBoaris 🤯:"
            twitterUrl={twitterUrl}
          />
        </div>
      </BlurFade>
      <BlurFade inView>
        <div className="container">
          <PostSubscriptionSection />
        </div>
      </BlurFade>
      <PostContent
        interpolation={interpolation}
        captionsSlot={
          <PostCaptions
            captionsEncoded={Schema.encodeSync(Captions)(captions)}
          />
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
      <BlurFade inView>
        <div className="container">
          <PostDisclaimerSection
            slug={slug}
            intent="Check out this interactive blog post from @MrBoaris 🤯:"
            twitterUrl={twitterUrl}
          />
        </div>
      </BlurFade>
      <div>
        <ButtonJumpToTop />
      </div>
    </article>
  )
}
