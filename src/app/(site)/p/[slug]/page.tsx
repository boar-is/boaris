import { Array, Option, Schema } from 'effect'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readableDate } from '~/lib/date/readable-date'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { cx } from '~/lib/react/cx'
import { resolveUrl } from '~/lib/routing/resolvers'
import { BackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { postRepository } from '~/model/data/post'
import { Post } from '~/model/post'
import { ButtonJumpToTop } from './_button-jump-to-top'
import { PostDisclaimerSection } from './_disclaimer-section'
import { PostSubscriptionSection } from './_subscription-section'

export const dynamicParams = false

export function generateStaticParams() {
  return postRepository.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const postEncoded = postRepository.find((it) => it.slug === slug)

  if (!postEncoded) {
    return notFound()
  }

  return {
    title: postEncoded.title,
    description: postEncoded.description ?? postEncoded.lead,
    alternates: {
      canonical: resolveUrl(`/p/${slug}`),
    },
  }
}

export default async function PostPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const postEncoded = postRepository.find((post) => post.slug === slug)

  if (!postEncoded) {
    return notFound()
  }

  const { default: Content } = await import(`~/content/${slug}.mdx`)

  const { title, lead, date, tags, posterUrl, twitterUrl } =
    Schema.decodeSync(Post)(postEncoded)

  const posterImageProps = {
    src: posterUrl,
    sizes: defaultImageSizes,
    alt: `${title}'s poster`,
    quality: 100,
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
      <section className="mx-auto typography w-full drop-shadow-md">
        <Content />
      </section>
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
