import * as S from '@effect/schema/Schema'
import { fetchQuery } from 'convex/nextjs'
import { api } from '~/convex/_generated/api'
import { WorkspacePageQueryResult } from '~/convex/queries/workspacePage'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'

export async function generateStaticParams() {
  return fetchQuery(api.queries.workspaceParams.default)
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const result = await fetchQuery(api.queries.workspacePage.default, {
    workspaceSlug,
  })

  if (!result) {
    return null
  }

  const { workspace } = S.decodeSync(WorkspacePageQueryResult)(result)

  return <div>{workspace.name}</div>
}
