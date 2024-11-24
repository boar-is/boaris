import { Option } from 'effect'
import { readableDate } from '~/lib/date/readable-date'
import { Image } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { Link } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { posts } from '~/model/post'
import { BlogPostArticle } from './_blog-post-poster-image'

export default async function SitePage() {
  return (
    <article className="container flex flex-col gap-6 lg:gap-10 items-stretch">
      <header className="sr-only">
        <h1>Blog</h1>
      </header>
      {posts.length ? (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BlogPostArticle
                posterUrl={post.posterUrl}
                className={cx(
                  shadowInsetStyles,
                  'rounded-5xl after:rounded-5xl flex flex-col lg:flex-row gap-6 p-3 justify-between transition-colors bg-clip-padding border border-white/10 bg-bg/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-xl',
                )}
              >
                <aside className="relative lg:basis-1/2 xl:basis-2/5 max-w-md">
                  <Image
                    src={post.posterUrl}
                    alt={`${post.title}'s poster`}
                    sizes="320px"
                    fill
                    className="object-cover rounded-4xl shadow-inner border border-white/10"
                  />
                </aside>
                <section className="flex-1 flex flex-col gap-8 py-4">
                  <header>
                    <hgroup>
                      <small className="text-muted-fg/75 font-medium tracking-wide text-sm lg:text-base">
                        {readableDate(post.date)}
                      </small>
                      <h3 className="text-2xl lg:text-4xl font-semibold tracking-tight text-balance bg-gradient-to-b from-fg to-muted-fg bg-clip-text text-transparent">
                        {post.title}
                      </h3>
                    </hgroup>
                  </header>

                  <p className="text-muted-fg text-lg font-medium text-pretty !leading-relaxed max-w-prose">
                    {post.lead}
                  </p>

                  {Option.some(post.tags).pipe(
                    Option.filter((it) => it.length > 0),
                    Option.andThen((tags) => (
                      <footer className="flex justify-between gap-8 items-center">
                        <ul className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm font-medium tracking-wide text-primary *:my-0.5">
                          {tags.map((tag) => {
                            const Icon = matchTagIcon(tag)

                            return (
                              <li key={tag}>
                                <div className="flex gap-1.5 items-center bg-primary/10 border border-primary rounded-full px-3 py-1">
                                  {Icon && <Icon className="size-5" />}
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
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl lg:text-4xl font-medium capitalize">
          No posts yet
        </div>
      )}
    </article>
  )
}
