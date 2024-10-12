import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/src/constants'
import { Image } from '~/src/primitives/image'
import { Link } from '~/src/primitives/link'

export async function generateStaticParams() {
  return fetchQuery(api.functions.project.params)
}

export default async function WorkspaceProjectPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug },
}: { params: Awaited<ReturnType<typeof generateStaticParams>>[number] }) {
  const data = await fetchQuery(api.functions.project.page, {
    workspaceSlug,
    projectSlug,
  })

  if (!data) {
    notFound()
  }

  const { project, posts, postTags, postAuthors, tags, users } = data

  return (
    <article className="container flex flex-col gap-6 md:gap-10 items-stretch">
      <header className="sr-only">
        <h1>{project.name}</h1>
      </header>
      {posts.length ? (
        posts.map((post) => {
          const tagIds = postTags
            .filter((it) => it.postId === post._id)
            .map((it) => it.tagId)
          const filteredTags = tags.filter((it) => tagIds.includes(it._id))

          const userIds = postAuthors
            .filter((it) => it.postId === post._id)
            .map((it) => it.authorId)
          const filteredAuthors = users.filter((it) => userIds.includes(it._id))

          return (
            <Link
              key={post.slug}
              href={`/[projectSlug]/${post.slug}`}
              className="group rounded-xl md:rounded-3xl"
            >
              <article className="flex flex-col justify-between md:group-even:flex-row md:flex-row-reverse border border-gray-3 rounded-[inherit] overflow-hidden transition-colors bg-gradient-to-tr from-gray-1 to-gray-2">
                {post.thumbnailUrl && (
                  <aside className="relative basis-2/5 aspect-video">
                    <Image
                      src={post.thumbnailUrl}
                      alt={`${post.title}'s thumbnail`}
                      width={1024}
                      height={768}
                      className="object-cover size-full"
                    />
                  </aside>
                )}
                <section className="flex-1 flex flex-col gap-3 md:gap-6 p-4 md:p-10">
                  <header>
                    <hgroup>
                      <small className="text-gray-8 font-bold tracking-wide uppercase text-xs md:text-sm">
                        {post.date}
                      </small>
                      <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-12 text-balance">
                        {post.title}
                      </h3>
                    </hgroup>
                  </header>
                  {filteredTags.length && (
                    <ul className="flex flex-wrap gap-1 md:gap-1.5 text-xs md:text-sm font-medium tracking-wide text-gray-8 *:my-0.5">
                      {filteredTags.map((tag) => (
                        <li key={tag.slug}>
                          <span className="border border-gray-7 rounded-full px-3 py-0.5">
                            {tag.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="text-gray-10 font-medium text-pretty text-sm md:text-base !leading-relaxed max-w-prose">
                    {post.lead}
                  </p>

                  {filteredAuthors.length && (
                    <ul className="space-y-1 md:space-y-2 text-gray-8 text-sm md:text-base font-semibold tracking-tight">
                      {filteredAuthors.map((author) => (
                        <li
                          key={author.slug}
                          className="flex items-center gap-1.5 md:gap-2"
                        >
                          {author.avatarUrl && (
                            <aside className="relative size-6 md:size-8 rounded-full overflow-hidden border shadow-inner">
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

                  <footer className="mt-auto">
                    <div className="block font-semibold text-sm md:text-base py-2 md:py-3 text-center border border-gray-4 rounded-md md:rounded-2xl text-gray-10 bg-gray-2 group-hover:bg-gray-3 transition-colors">
                      Read More
                    </div>
                  </footer>
                </section>
              </article>
            </Link>
          )
        })
      ) : (
        <div className="text-center text-2xl md:text-5xl text-gray-8 font-semibold capitalize">
          No posts yet
        </div>
      )}
    </article>
  )
}
