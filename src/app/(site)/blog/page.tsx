import { Option } from 'effect'
import { readableDate } from '~/lib/date/readable-date'
import { Image } from '~/lib/media/image'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import { Link } from '~/lib/navigation/link'
import { posts } from '~/model/post'

export const metadata = constructMetadata({
  title: 'Blog',
})

export default async function BlogPage() {
  return (
    <article className="container max-w-5xl flex flex-col gap-6 lg:gap-10 items-stretch">
      <header className="sr-only">
        <h1>Blog</h1>
      </header>
      {posts.length ? (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group rounded-xl lg:rounded-3xl flex flex-col lg:flex-row gap-4 lg:gap-12 justify-between overflow-hidden transition-colors bg-bg">
                <aside className="relative lg:basis-1/2 xl:basis-1/3">
                  <Image
                    src={post.posterUrl}
                    alt={`${post.title}'s poster`}
                    width={640}
                    height={360}
                    className="object-cover sizes-full rounded-xl lg:rounded-2xl"
                  />
                </aside>
                <section className="flex-1 flex flex-col gap-8">
                  <header className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-balance">
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
              </article>
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
