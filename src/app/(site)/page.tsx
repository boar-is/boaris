import { Option } from 'effect'
import { readableDate } from '~/lib/date/readable-date'
import { Image, type ImageProps } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { Link } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { posts } from '~/model/post'
import { BlogPostArticle } from './_blog-post-article'

export default async function SitePage() {
  return (
    <article className="container">
      <header className="sr-only">
        <h1>Blog</h1>
      </header>
      {posts.length ? (
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => {
            const posterImageProps = {
              src: post.posterUrl,
              sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
              alt: `${post.title}'s poster`,
            } satisfies ImageProps

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="~rounded-4xl/5xl"
              >
                <BlurFade key={post.slug} delay={index * 0.05} inView>
                  <BlogPostArticle
                    posterImageProps={posterImageProps}
                    className={cx(
                      shadowInsetStyles,
                      '~rounded-4xl/5xl after:~rounded-4xl/5xl flex flex-col lg:flex-row ~gap-6/10 ~p-4/5 justify-between bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md',
                    )}
                  >
                    <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
                      <Image
                        {...posterImageProps}
                        fill
                        className="object-cover ~rounded-3xl/4xl shadow-inner border border-white/10 bg-clip-border"
                      />
                    </aside>
                    <section className="flex-1 ~space-y-4/6 ~py-0/4">
                      <header>
                        <hgroup className="space-y-1">
                          <small className="text-accent-11 font-semibold tracking-wide ~text-sm/base">
                            {readableDate(post.date)}
                          </small>
                          <h3 className="~text-3xl/4xl font-semibold tracking-tight text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
                            {post.title}
                          </h3>
                        </hgroup>
                      </header>

                      <p className="text-gray-11 ~text-sm/lg font-medium text-pretty !leading-relaxed max-w-prose">
                        {post.lead}
                      </p>

                      {Option.some(post.tags).pipe(
                        Option.filter((it) => it.length > 0),
                        Option.andThen((tags) => (
                          <footer className="flex justify-between gap-8 items-center">
                            <ul className="flex flex-wrap ~gap-2/4 ~text-xs/sm font-semibold tracking-wide text-accent-11 *:my-0.5">
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
        </div>
      ) : (
        <div className="text-center ~text-2xl/4xl font-medium capitalize">
          No posts yet
        </div>
      )}
    </article>
  )
}
