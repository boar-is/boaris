import { storageFileRepository } from '~/src/domain/storage/storage-file'
import { userRepository } from '~/src/domain/users/user'
import {
  type Workspace,
  workspaceRepository,
} from '~/src/domain/workspaces/workspace'
import { workspaceMemberRepository } from '~/src/domain/workspaces/workspace-member'

export type WorkspaceContextValue = {
  readonly name: string
  readonly logoSrc: string | null
  readonly socialLinks: ReadonlyArray<string> | null
}

export const queryWorkspaceContext = async (
  slug: string,
): Promise<WorkspaceContextValue | null> => {
  const workspace = workspaceRepository.find((it) => it.slug === slug)

  if (!workspace) {
    return null
  }

  const logoId = await getLogoOrOwnerAvatarId(workspace)
  const logoSrc =
    storageFileRepository.find((it) => it._id === logoId)?.src ?? null

  return {
    name: workspace.name,
    logoSrc,
    socialLinks: workspace.socialLinks,
  }
}

const getLogoOrOwnerAvatarId = async (workspace: Workspace) => {
  if (workspace.logoId) {
    return workspace.logoId
  }

  const workspaceOwner = workspaceMemberRepository.find(
    (it) => it.workspaceId === workspace._id && it.role === 'owner',
  )

  if (!workspaceOwner) {
    return null
  }

  const user = userRepository.find((it) => it._id === workspaceOwner._id)

  return user?.avatarId ?? null
}
