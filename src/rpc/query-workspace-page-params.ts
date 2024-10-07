import { Array } from 'effect'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspacePageParams = {
  workspaceSlug: string
}

export const queryWorkspacePageParams = async () => {
  const latestWorkspaces = Array.takeRight(workspaceRepository, 999)

  return latestWorkspaces.map(
    (workspace): WorkspacePageParams => ({
      workspaceSlug: workspace.slug,
    }),
  )
}
