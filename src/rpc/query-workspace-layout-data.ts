import { storageRepository } from '~/src/repositories/storage-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export const queryWorkspaceLayoutData = async ({
  workspaceSlug,
}: {
  workspaceSlug: string
}) => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  const storageMap = await storageRepository.getStorageMap([workspace.logoId])

  return {
    workspace,
    storageMap: storageMap,
  }
}
