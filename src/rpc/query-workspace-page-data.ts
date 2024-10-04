import { workspaceRepository } from '../domain/workspaces/workspace'

export type WorkspacePageData = {
  readonly workspace: {
    readonly name: string
  }
}

export const queryWorkspacePageData = async ({
  workspaceSlug,
}: { workspaceSlug: string }): Promise<WorkspacePageData | null> => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  return {
    workspace: {
      name: workspace.name,
    },
  }
}
