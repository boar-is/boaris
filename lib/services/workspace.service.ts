import { Match } from 'effect'
import type { FC } from 'react'
import { GitHubIcon, LinkedInIcon, XIcon } from '~/components/icons'
import { StorageRepository } from '../db/storages'
import { WorkspaceRepository } from '../db/workspaces'
import { UserService } from './user.service'

export type WorkspaceVm = {
  name: string
  logoSrc?: string | undefined
  socials: Array<{
    name: string
    src: string
    icon: FC<{ className?: string | undefined }>
  }>
}

const matchSocialNameToIcon = (socialName: string) =>
  Match.value(socialName).pipe(
    Match.when('LinkedIn', () => LinkedInIcon),
    Match.when('X', () => XIcon),
    Match.when('GitHub', () => GitHubIcon),
    Match.orElseAbsurd,
  )

export class WorkspaceService {
  static mvpWorkspaceSlug = 'boaris'

  static getWorkspaceVm() {
    const workspace = WorkspaceRepository.findOneBySlug(
      WorkspaceService.mvpWorkspaceSlug,
    )

    if (!workspace) {
      return null
    }

    const logoId =
      workspace.logoId ?? UserService.getWorkspaceOwner(workspace._id)?.avatarId

    return {
      name: workspace.name,
      logoSrc: logoId && StorageRepository.findOneSrc(logoId),
      socials: workspace.socials
        ? Object.entries(workspace.socials).map(([name, src]) => ({
            name,
            src,
            icon: matchSocialNameToIcon(name),
          }))
        : [],
    } satisfies WorkspaceVm
  }
}
