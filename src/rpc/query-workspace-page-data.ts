import {
  type Workspace,
  workspaceRepository,
} from '~/src/domain/workspaces/workspace'

export type WorkspacePageData = {
  readonly workspace: Pick<Workspace, 'name'>
}

export const queryWorkspacePageData = async ({
  workspaceSlug,
}: { readonly workspaceSlug: string }): Promise<WorkspacePageData | null> => {
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
