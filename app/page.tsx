import { queryWorkspacePageData } from '~/src/rpc/query-workspace-page-data'
import type { WorkspacePageParams } from '~/src/rpc/query-workspace-page-params'
import { currentWorkspaceSlug } from '~/src/shared/constants'

export default async function WorkspacePage({
  params: { workspaceSlug = currentWorkspaceSlug },
}: { params: WorkspacePageParams }) {
  const data = await queryWorkspacePageData({
    workspaceSlug,
  })

  if (!data) {
    return null
  }

  return <div>{data.workspace.name}</div>
}
