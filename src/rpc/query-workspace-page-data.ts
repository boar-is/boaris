import { workspaceRepository } from '~/src/repositories/workspace-repository'

export const queryWorkspacePageData = async ({
  workspaceSlug,
}: {
  workspaceSlug: string
}) => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  return {
    workspace,
  }
}
