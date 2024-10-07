import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspacePageParams = {
  workspaceSlug: string
}

export const queryWorkspacePageParams = async () =>
  workspaceRepository.map(
    (workspace): WorkspacePageParams => ({
      workspaceSlug: workspace.slug,
    }),
  )
