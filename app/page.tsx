import { queryWorkspacePageData } from '~/src/rpc/query-workspace-page-data'
import {
  type WorkspacePageParams,
  queryWorkspacePageParams,
} from '~/src/rpc/query-workspace-page-params'
import { currentWorkspaceSlug } from '~/src/shared/constants'

export async function generateStaticParams() {
  return queryWorkspacePageParams()
}

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: { params: WorkspacePageParams }) {
  const data = await queryWorkspacePageData({
    workspaceSlug,
  })

  if (!data) {
    return null
  }

  const { workspace } = data

  return <div>{workspace.name}</div>
}
