import { Array, pipe } from 'effect'
import { workspaceRepository } from '~/src/domain/workspaces/workspace'

export type WorkspacePageParams = {
  readonly workspaceSlug: string
}

export const queryWorkspacePageParams = async (): Promise<
  ReadonlyArray<WorkspacePageParams>
> => {
  const latestWorkspaces = pipe(workspaceRepository, Array.takeRight(999))

  return latestWorkspaces.map((workspace) => ({
    workspaceSlug: workspace.slug,
  }))
}
