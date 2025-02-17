import { Option, Schema } from 'effect'
import { CtaModal } from '~/app/(site)/_cta-modal'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { readableDate } from '~/lib/date/readable-date'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { Link } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { postRepository } from '~/model/data/post'
import { Post } from '~/model/post'
import { BlogPostArticle } from './_blog-post-article'

const whitespace = ' '

export default async function SitePage() {
  const posts = Schema.decodeSync(Schema.Array(Post))(postRepository)

  return (
    <div className="~space-y-12/20">
      <article className="container text-center ~py-12/24 flex flex-col items-center">
        <p className="text-accent-11 font-semibold tracking-wide ~text-lg/2xl">
          Hi! I'm Boaris
        </p>
        <h1 className="~text-4xl/7xl font-extrabold tracking-tight text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent ~mt-2/3 ~mb-4/8 ~pb-1/1.5">
          I’m on a mission to make learning more{whitespace}
          <em className="underline decoration-accent-11 decoration-wavy ">
            effective
          </em>
        </h1>
        <p className="text-gray-12/75 ~text-lg/2xl font-medium text-balance !leading-relaxed max-w-prose">
          This blog introduces an experimental format that blends the best of
          text and video. It slows down scrolling, making it easier to explore
          code examples and follow the explanation step by step.
        </p>
        <footer className="flex flex-wrap ~gap-4/8 *:~px-6/12 ~mt-6/12">
          <Link
            href={process.env['CONTACT_ME_FORM_URL']!}
            target="_blank"
            className={buttonStyles({ intent: 'secondary', size: 'lg' })}
          >
            Get in touch
          </Link>
          <CtaModal size="lg" />
        </footer>
      </article>
      <article className="container">
        <header>
          <h2 className="sr-only">Recent Posts</h2>
        </header>
        {posts.length ? (
          <section className="flex flex-col gap-4">
            {posts.map((post, index) => {
              const posterImageProps = {
                src: post.posterUrl,
                sizes: defaultImageSizes,
                alt: `${post.title}'s poster`,
                quality: 80,
              } satisfies ImageProps

              return (
                <Link
                  key={post.slug}
                  href={`/p/${post.slug}`}
                  className="~rounded-2xl/4xl"
                >
                  <BlurFade key={post.slug} delay={index * 0.05} inView>
                    <BlogPostArticle
                      posterImageProps={posterImageProps}
                      className={cx(
                        shadowInsetStyles,
                        '~rounded-2xl/4xl after:~rounded-2xl/4xl flex flex-col lg:flex-row ~gap-4/8 ~p-4/5 justify-between bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md',
                      )}
                    >
                      <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
                        <Image
                          {...posterImageProps}
                          fill
                          className="object-cover ~rounded-xl/3xl shadow-inner border border-white/10 bg-clip-border"
                        />
                      </aside>
                      <section className="flex-1 ~space-y-3/6 ~py-0/4">
                        <header>
                          <hgroup className="space-y-1">
                            <small className="text-accent-11 font-semibold tracking-wide ~text-sm/lg">
                              {readableDate(post.date)}
                            </small>
                            <h3 className="~text-3xl/5xl font-semibold tracking-tight text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
                              {post.title}
                            </h3>
                          </hgroup>
                        </header>

                        <p className="text-gray-11 ~text-sm/xl font-medium text-pretty !leading-relaxed max-w-prose">
                          {post.lead}
                        </p>

                        {Option.some(post.tags).pipe(
                          Option.filter((it) => it.length > 0),
                          Option.andThen((tags) => (
                            <footer className="flex justify-between gap-8 items-center">
                              <ul className="flex flex-wrap ~gap-2/4 ~text-xs/base font-semibold tracking-wide text-accent-11 *:my-0.5">
                                {tags.map((tag) => {
                                  const Icon = matchTagIcon(tag)

                                  return (
                                    <li key={tag}>
                                      <div
                                        className={cx(
                                          shadowInsetStyles,
                                          'flex ~gap-1/1.5 items-center bg-accent-8/25 border border-accent-8 rounded-full after:rounded-full px-3 py-1',
                                        )}
                                      >
                                        {Icon && <Icon className="~size-4/5" />}
                                        {tag}
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            </footer>
                          )),
                          Option.getOrThrow,
                        )}
                      </section>
                    </BlogPostArticle>
                  </BlurFade>
                </Link>
              )
            })}
          </section>
        ) : (
          <div className="text-center ~text-2xl/4xl font-medium capitalize">
            No posts yet
          </div>
        )}
      </article>
    </div>
  )
}
