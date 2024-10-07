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
