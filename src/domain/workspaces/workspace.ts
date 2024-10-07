import { currentWorkspaceSlug } from '~/src/shared/constants'
import type { Id } from '~/src/shared/id'
import type { SocialLink } from '~/src/shared/social-link'

export type Workspace = {
  _id: Id
  _creationTime: number
  name: string
  slug: string
  logoId: Id | null
  socialLinks: Array<SocialLink>
}

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
