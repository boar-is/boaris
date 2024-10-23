import { Effect, HashMap, Option } from 'effect'
import { notFound } from 'next/navigation'
import { currentWorkspaceSlug } from '~/lib/constants'
import { Image } from '~/lib/media/image'
import { Link } from '~/lib/navigation/link'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'
import { readableDate } from '~/lib/utils/readable-date'
import { ProjectRequest } from '~/rpc/project-request'
import { ProjectSlugsRequest } from '~/rpc/project-slugs-request'
import { AppServerRuntime } from '~/runtimes/app-server-runtime'
import { AppRpcClient } from '~/services/app-rpc-client'

export async function generateStaticParams() {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      return yield* (yield* AppRpcClient)(new ProjectSlugsRequest())
    }),
  )
}

export default async function WorkspaceProjectPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  return AppServerRuntime.runPromise(
    Effect.gen(function* () {
      const result = yield* (yield* AppRpcClient)(
        new ProjectRequest({ workspaceSlug, projectSlug }),
      )

      if (!result) {
        notFound()
      }

      const { project, posts, tagsByPostSlug, authorsByPostSlug } = result

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
                    {post.thumbnailUrl.pipe(
                      Option.andThen((url) => (
                        <aside className="relative lg:basis-1/2 xl:basis-1/3">
                          <Image
                            src={url}
                            alt={`${post.title}'s thumbnail`}
                            width={1024}
                            height={768}
                            className="object-cover sizes-full rounded-xl lg:rounded-2xl"
                          />
                        </aside>
                      )),
                      Option.getOrNull,
                    )}
                    <section className="flex-1 flex flex-col gap-2 lg:gap-3">
                      <header>
                        <h3 className="text-2xl lg:text-3xl font-medium tracking-tight text-gray-12 text-balance">
                          {post.title}
                        </h3>
                      </header>
                      {tagsByPostSlug.pipe(
                        HashMap.get(post.slug),
                        Option.filter((it) => it.length > 0),
                        Option.andThen((tags) => (
                          <ul className="flex flex-wrap gap-1 lg:gap-1.5 text-xs lg:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                            {tags.map((tag) => (
                              <li key={tag.slug}>
                                <span className="border border-gray-7 rounded-full px-3 py-0.5">
                                  {tag.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )),
                        Option.getOrThrow,
                      )}

                      {post.lead.pipe(
                        Option.andThen((lead) => (
                          <p className="text-gray-10 text-pretty !leading-relaxed max-w-prose">
                            {lead}
                          </p>
                        )),
                        Option.getOrNull,
                      )}

                      <footer className="flex justify-between gap-8 items-center">
                        {authorsByPostSlug.pipe(
                          HashMap.get(post.slug),
                          Option.filter((it) => it.length > 0),
                          Option.andThen((authors) => (
                            <ul className="space-y-1 lg:space-y-2 text-gray-8 text-sm lg:text-base font-medium tracking-tight">
                              {authors.map((author) => (
                                <li
                                  key={author.slug}
                                  className="flex items-center gap-1.5 lg:gap-2"
                                >
                                  {author.avatarUrl.pipe(
                                    Option.andThen((url) => (
                                      <aside className="relative size-6 lg:size-8 rounded-full overflow-hidden border shadow-inner">
                                        <Image
                                          src={url}
                                          alt={`${author.name}'s avatar`}
                                          width={32}
                                          height={32}
                                          className="size-full object-cover shadow-inner"
                                        />
                                      </aside>
                                    )),
                                    Option.getOrNull,
                                  )}
                                  {author.name}
                                </li>
                              ))}
                            </ul>
                          )),
                          Option.getOrThrow,
                        )}
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
    }),
  )
}
