import type { Workspace } from '~/src/domain/workspaces/workspace'
import { currentWorkspaceSlug } from '~/src/shared/constants'

export const workspaceRepository: Array<Workspace> = [
  {
    _id: 'f1yR23PbuoDW',
    _creationTime: Date.now(),
    name: 'Boar.is',
    slug: currentWorkspaceSlug,
    logoId: 'F6gGQOuGSZGr',
    socialLinks: [
      {
        href: 'https://linkedin.com/in/boris-zubchenko/',
        label: null,
      },
      {
        href: 'https://x.com/BorisZubchenk',
        label: null,
      },
      {
        href: 'https://github.com/BorisZubchenko',
        label: null,
      },
    ],
  },
]
