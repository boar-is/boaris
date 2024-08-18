import { Match } from 'effect'
import type { FC } from 'react'
import { GitHubIcon, LinkedInIcon, XIcon } from '~/components/icons'
import { storageDocs } from '~/lib/db/storages'
import { userDocs } from '~/lib/db/users'
import { workspaceUserDocs } from '~/lib/db/workspace-users'
import { type WorkspaceDoc, workspaceDocs } from '~/lib/db/workspaces'

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

const getWorkspaceOwner = (workspaceId: WorkspaceDoc['_id']) => {
  const ownerId = workspaceUserDocs.find(
    (it) => it.workspaceId === workspaceId && it.role === 'owner',
  )?._id

  return userDocs.find((it) => it._id === ownerId)
}

export const getWorkspace = async (slug = 'boaris') => {
  const workspace = workspaceDocs.find((it) => it.slug === slug)

  if (!workspace) {
    return null
  }

  const logoId = workspace.logoId ?? getWorkspaceOwner(workspace._id)?.avatarId

  return {
    name: workspace.name,
    logoSrc: storageDocs.find((it) => it._id === logoId)?.src,
    socials: workspace.socials
      ? Object.entries(workspace.socials).map(([name, src]) => ({
          name,
          src,
          icon: matchSocialNameToIcon(name),
        }))
      : [],
  } satisfies WorkspaceVm
}
