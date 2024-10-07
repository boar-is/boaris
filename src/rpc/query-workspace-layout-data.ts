import { storageFileRepository } from '~/src/repositories/storage-file-repository'
import { userRepository } from '~/src/repositories/user-repository'
import { workspaceMemberRepository } from '~/src/repositories/workspace-member-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import type { SocialLink } from '~/src/shared/social-link'

export type WorkspaceLayoutData = {
  workspace: {
    name: string
    socialLinks: Array<SocialLink>
    logoSrc: string | null
  }
}

export const queryWorkspaceLayoutData = async ({
  workspaceSlug,
}: {
  workspaceSlug: string
}): Promise<WorkspaceLayoutData | null> => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  const logoId = await getLogoOrOwnerAvatarId(workspace)
  const logoSrc =
    storageFileRepository.find((it) => it._id === logoId)?.src ?? null

  const socialLinks = workspace.socialLinks.map(
    (it): SocialLink => ({
      href: it.href,
      label: it.label,
    }),
  )

  return {
    workspace: {
      name: workspace.name,
      logoSrc,
      socialLinks,
    },
  }
}

const getLogoOrOwnerAvatarId = async (
  workspace: (typeof workspaceRepository)[number],
) => {
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
