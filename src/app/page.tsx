import { fetchQuery } from 'convex/nextjs'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/src/constants'

export async function generateStaticParams() {
  return fetchQuery(api.functions.workspace.params)
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: { params: Awaited<ReturnType<typeof generateStaticParams>>[number] }) {
  const data = await fetchQuery(api.functions.workspace.page, {
    workspaceSlug,
  })

  if (!data) {
    return null
  }

  const { workspace } = data

  return <div>{workspace.name}</div>
}
