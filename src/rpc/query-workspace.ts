import { storageFileRepository } from '~/src/domain/storage/storage-file'
import { userRepository } from '~/src/domain/users/user'
import {
  type Workspace,
  workspaceRepository,
} from '~/src/domain/workspaces/workspace'
import { workspaceMemberRepository } from '~/src/domain/workspaces/workspace-member'

export type WorkspaceVm = {
  readonly name: string
  readonly logoSrc: string | null
  readonly socialLinks: ReadonlyArray<WorkspaceSocialLinkVm> | null
}

export type WorkspaceSocialLinkVm = {
  readonly href: string
  readonly label: string | null
}

export const queryWorkspace = async (
  slug: string,
): Promise<WorkspaceVm | null> => {
  const workspace = workspaceRepository.find((it) => it.slug === slug)

  if (!workspace) {
    return null
  }

  const logoId = await getLogoOrOwnerAvatarId(workspace)
  const logoSrc =
    storageFileRepository.find((it) => it._id === logoId)?.src ?? null

  const socialLinks =
    workspace.socialLinks?.map(
      (it) =>
        ({
          href: it.href,
          label: it.label,
        }) satisfies WorkspaceSocialLinkVm,
    ) ?? null

  return {
    name: workspace.name,
    logoSrc,
    socialLinks,
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
