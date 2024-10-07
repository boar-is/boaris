import { storageFileRepository } from '~/src/repositories/storage-file-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import type { SocialLink } from '~/src/shared/social-link'

export type WorkspaceLayoutData = {
  workspace: {
    name: string
    logoSrc: string | null
    socialLinks: Array<SocialLink>
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

  const logoSrc =
    storageFileRepository.find((it) => it._id === workspace.logoId)?.src ?? null

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
