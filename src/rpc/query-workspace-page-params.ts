import { Array, pipe } from 'effect'
import type { Workspace } from '~/src/domain/workspaces/workspace'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspacePageParams = {
  readonly workspaceSlug: Workspace['slug']
}

export const queryWorkspacePageParams = async (): Promise<
  ReadonlyArray<WorkspacePageParams>
> => {
  const latestWorkspaces = pipe(workspaceRepository, Array.takeRight(999))

  return latestWorkspaces.map((workspace) => ({
    workspaceSlug: workspace.slug,
  }))
}
