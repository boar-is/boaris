import { currentWorkspaceSlug } from '~/src/shared/constants'
import type { Entity } from '~/src/shared/entity'
import type { SocialLink } from '~/src/shared/social-link'

export type Workspace = Entity & {
  readonly name: string
  readonly slug: string
  readonly logoId: Entity['_id'] | null
  readonly socialLinks: ReadonlyArray<SocialLink>
}

export const workspaceRepository: ReadonlyArray<Workspace> = [
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
