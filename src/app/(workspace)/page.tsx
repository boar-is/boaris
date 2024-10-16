import { fetchQuery } from 'convex/nextjs'
import { api } from '~/convex/_generated/api'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'

export async function generateStaticParams() {
  return fetchQuery(api.queries.workspaceParams.default)
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const data = await fetchQuery(api.queries.workspacePage.default, {
    workspaceSlug,
  })

  if (!data) {
    return null
  }

  const { workspace } = data

  return <div>{workspace.name}</div>
}
