import { fetchQuery } from 'convex/nextjs'
import * as S from 'effect/Schema'
import { notFound } from 'next/navigation'
import { api } from '~/convex/_generated/api'
import { WorkspacePageQueryResult } from '~/convex/workspacePage'
import { currentWorkspaceSlug } from '~/lib/constants'
import type { PropsWithStaticParams } from '~/lib/react/props-with-static-params'

export async function generateStaticParams() {
  return fetchQuery(api.workspaceParams.default)
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: PropsWithStaticParams<typeof generateStaticParams>) {
  const result = await fetchQuery(api.workspacePage.default, {
    workspaceSlug,
  })

  if (!result) {
    notFound()
  }

  const { workspace } = S.decodeSync(WorkspacePageQueryResult)(result)

  return <div>{workspace.name}</div>
}
