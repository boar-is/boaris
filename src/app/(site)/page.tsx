import { Option } from 'effect'
import { readableDate } from '~/lib/date/readable-date'
import { Image } from '~/lib/media/image'
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
                    className="object-cover rounded-4xl"
                  />
                </aside>
                <section className="flex-1 flex flex-col gap-8 py-4">
                  <header className="space-y-4">
                    <h3 className="text-2xl lg:text-4xl font-medium tracking-tight text-balance">
                      {post.title}
                    </h3>
                    {Option.some(post.tags).pipe(
                      Option.filter((it) => it.length > 0),
                      Option.andThen((tags) => (
                        <ul className="flex flex-wrap gap-1 lg:gap-2 text-xs lg:text-sm font-medium tracking-wide text-primary *:my-0.5">
                          {tags.map((tag) => (
                            <li key={tag}>
                              <span className="bg-primary/10 rounded-full px-3.5 py-1">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )),
                      Option.getOrThrow,
                    )}
                  </header>

                  <p className="text-muted-fg text-pretty !leading-relaxed max-w-prose">
                    {post.lead}
                  </p>

                  <footer className="flex justify-between gap-8 items-center">
                    <small className="text-muted-fg/50 font-medium tracking-wide text-xs lg:text-sm">
                      {readableDate(post.date)}
                    </small>
                  </footer>
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
