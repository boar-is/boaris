import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { WorkspaceProjectPostProvider } from '~/src/app/[projectSlug]/[postSlug]/context'
import { WorkspaceProjectClientPage } from '~/src/app/[projectSlug]/[postSlug]/page.client'
import { currentWorkspaceSlug } from '~/src/constants'

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
    <div className="flex flex-col container min-h-full">
      <WorkspaceProjectPostProvider data={data}>
        <WorkspaceProjectClientPage />
      </WorkspaceProjectPostProvider>
    </div>
  )
}
