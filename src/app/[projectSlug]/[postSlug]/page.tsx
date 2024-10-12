import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/src/constants'
import { BlogPostClient } from './page.client'

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

  const { post } = data

  return (
    <div className="flex flex-col container min-h-full">
      <BlogPostClient
        post={post}
        captions={revisionValue.captions}
        tracks={revisionValue.tracks}
        layout={revisionValue.layout}
        storageMap={storageMap}
      />
    </div>
  )
}
