import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { WorkspaceProjectPostProvider } from '~/src/app/[projectSlug]/[postSlug]/context'
import { WorkspaceProjectClientPage } from '~/src/app/[projectSlug]/[postSlug]/page.client'
import { currentWorkspaceSlug } from '~/src/constants'
import { Image } from '~/src/primitives/image'

export async function generateStaticParams() {
  return fetchQuery(api.functions.post.params)
}

export default async function WorkspaceProjectPostPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug, postSlug },
}: { params: Awaited<ReturnType<typeof generateStaticParams>>[number] }) {
  const data = await fetchQuery(api.functions.post.page, {
    workspaceSlug,
    projectSlug,
    postSlug,
  })

  if (!data) {
    notFound()
  }

  return (
    <WorkspaceProjectPostProvider data={data}>
      <article className="container flex flex-col gap-8 items-center">
        <header className="w-full max-w-prose">
          <hgroup className="flex flex-col gap-4">
            {data.post.thumbnailUrl && (
              <figure className="relative">
                <Image
                  src={data.post.thumbnailUrl}
                  alt={`${data.post.title}'s thumbnail's blur`}
                  width={1024}
                  height={768}
                  className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
                />
                <Image
                  src={data.post.thumbnailUrl}
                  alt={`${data.post.title}'s thumbnail`}
                  width={1024}
                  height={768}
                  className="rounded-2xl drop-shadow-xl"
                />
              </figure>
            )}
            <h1 className="text-4xl text-gray-12 font-semibold tracking-tight text-balance">
              {data.post.title}
            </h1>
            {data.tags.length && (
              <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-gray-8 *:my-0.5">
                {data.tags.map((tag) => (
                  <li key={tag.slug}>
                    <span className="border border-gray-7 rounded-full px-3 py-0.5">
                      {tag.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {data.post.lead && (
              <p className="text-gray-10 text-pretty text-lg font-medium">
                {data.post.lead}
              </p>
            )}
            <div className="flex justify-between gap-8 items-center">
              {data.authors.length && (
                <ul className="space-y-1 lg:space-y-2 text-gray-8 lg:text-lg font-medium tracking-tight">
                  {data.authors.map((author) => (
                    <li
                      key={author.slug}
                      className="flex items-center gap-1.5 lg:gap-2"
                    >
                      {author.avatarUrl && (
                        <aside className="relative size-8 lg:size-10 rounded-full overflow-hidden border shadow-inner">
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
              <small className="text-gray-8 font-medium tracking-wide text-sm lg:text-base">
                {data.post.date}
              </small>
            </div>
          </hgroup>
        </header>
        <section className="w-full max-w-prose">
          <WorkspaceProjectClientPage />
        </section>
      </article>
    </WorkspaceProjectPostProvider>
  )
}
