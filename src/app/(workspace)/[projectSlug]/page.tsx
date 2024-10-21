import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/lib/constants'
import { Image } from '~/lib/media/image'
import { Link } from '~/lib/navigation/link'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'

export async function generateStaticParams() {
  return fetchQuery(api.queries.projectParams.default)
}

export default async function WorkspaceProjectPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const data = await fetchQuery(api.queries.projectPage.default, {
    workspaceSlug,
    projectSlug,
  })

  if (!data) {
    notFound()
  }

  const { project, posts, tagsByPostSlug, authorsByPostSlug } = data

  return (
    <article className="container flex flex-col gap-6 lg:gap-10 items-stretch">
      <header className="sr-only">
        <h1>{project.name}</h1>
      </header>
      {posts.length ? (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${project.slug}/${post.slug}`}>
              <article className="group rounded-xl lg:rounded-3xl flex flex-col lg:flex-row gap-4 lg:gap-8 p-4 lg:p-6 justify-between items-center border border-gray-3 overflow-hidden transition-colors bg-gradient-to-tr from-gray-1/90 to-gray-2/90">
                {post.thumbnailUrl && (
                  <aside className="relative lg:basis-1/2 xl:basis-1/3">
                    <Image
                      src={post.thumbnailUrl}
                      alt={`${post.title}'s thumbnail`}
                      width={1024}
                      height={768}
                      className="object-cover sizes-full rounded-xl lg:rounded-2xl"
                    />
                  </aside>
                )}
                <section className="flex-1 flex flex-col gap-2 lg:gap-3">
                  <header>
                    <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-gray-12 text-balance">
                      {post.title}
                    </h3>
                  </header>

                  {tagsByPostSlug[post.slug]!.length && (
                    <ul className="flex flex-wrap gap-1 lg:gap-1.5 text-xs lg:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                      {tagsByPostSlug[post.slug]!.map((tag) => (
                        <li key={tag.slug}>
                          <span className="border border-gray-7 rounded-full px-3 py-0.5">
                            {tag.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {post.lead && (
                    <p className="text-gray-10 text-pretty !leading-relaxed max-w-prose">
                      {post.lead}
                    </p>
                  )}

                  <footer className="flex justify-between gap-8 items-center">
                    {authorsByPostSlug[post.slug]!.length && (
                      <ul className="space-y-1 lg:space-y-2 text-gray-8 text-sm lg:text-base font-medium tracking-tight">
                        {authorsByPostSlug[post.slug]!.map((author) => (
                          <li
                            key={author.slug}
                            className="flex items-center gap-1.5 lg:gap-2"
                          >
                            {author.avatarUrl && (
                              <aside className="relative size-6 lg:size-8 rounded-full overflow-hidden border shadow-inner">
                                <Image
                                  src={author.avatarUrl}
                                  alt={`${author.name}'s avatar`}
                                  width={32}
                                  height={32}
                                  className="size-full object-cover shadow-inner"
                                />
                              </aside>
                            )}
                            {author.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <small className="text-gray-8 font-medium tracking-wide text-xs lg:text-sm">
                      {post.date}
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
