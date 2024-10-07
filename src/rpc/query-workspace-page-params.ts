import { Array, pipe } from 'effect'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspacePageParams = {
  workspaceSlug: string
}

export const queryWorkspacePageParams = async (): Promise<
  Array<WorkspacePageParams>
> => {
  const latestWorkspaces = pipe(workspaceRepository, Array.takeRight(999))

  return latestWorkspaces.map((workspace) => ({
    workspaceSlug: workspace.slug,
  }))
}
