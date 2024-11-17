import { Option } from 'effect'
import { Image } from '~/lib/media/image'
import { Link } from '~/lib/navigation/link'
import { readableDate } from '~/lib/utils/readable-date'
import { posts } from '~/model2/post'

export default async function BlogPage() {
  return (
    <article className="container flex flex-col gap-6 lg:gap-10 items-stretch">
      <header className="sr-only">
        <h1>Blog</h1>
      </header>
      {posts.length ? (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group rounded-xl lg:rounded-3xl flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-6 justify-between items-center border border-gray-3 overflow-hidden transition-colors bg-gradient-to-tr from-gray-1/90 to-gray-2/90">
                <aside className="relative lg:basis-1/2 xl:basis-1/3">
                  <Image
                    src={post.posterUrl}
                    alt={`${post.title}'s poster`}
                    width={1024}
                    height={768}
                    className="object-cover sizes-full rounded-xl lg:rounded-2xl"
                  />
                </aside>
                <section className="flex-1 flex flex-col gap-2 lg:gap-3">
                  <header>
                    <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-gray-12 text-balance">
                      {post.title}
                    </h3>
                  </header>
                  {Option.some(post.tags).pipe(
                    Option.filter((it) => it.length > 0),
                    Option.andThen((tags) => (
                      <ul className="flex flex-wrap gap-1 lg:gap-1.5 text-xs lg:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                        {tags.map((tag) => (
                          <li key={tag}>
                            <span className="border border-gray-7 rounded-full px-3 py-0.5">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )),
                    Option.getOrThrow,
                  )}

                  <p className="text-gray-10 text-pretty !leading-relaxed max-w-prose">
                    {post.lead}
                  </p>

                  <footer className="flex justify-between gap-8 items-center">
                    <small className="text-gray-8 font-medium tracking-wide text-xs lg:text-sm">
                      {readableDate(post.date)}
                    </small>
                  </footer>
                </section>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl lg:text-4xl text-gray-12 font-medium capitalize">
          No posts yet
        </div>
      )}
    </article>
  )
}
