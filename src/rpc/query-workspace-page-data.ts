import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspacePageData = {
  workspace: {
    name: string
  }
}

export const queryWorkspacePageData = async ({
  workspaceSlug,
}: {
  workspaceSlug: string
}): Promise<WorkspacePageData | null> => {
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
