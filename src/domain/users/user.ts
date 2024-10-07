import type { Id } from '~/src/shared/id'
import type { SocialLink } from '~/src/shared/social-link'

export type User = {
  _id: Id
  _creationTime: number
  name: string
  slug: string
  avatarId: Id | null
  socialLinks: Array<SocialLink>
}

export const userRepository: Array<User> = [
  {
    _id: 'QcXfwMYqlHu5',
    _creationTime: Date.now(),
    name: 'Boris Zubchenko',
    slug: 'boris',
    avatarId: 'F6gGQOuGSZGr',
    socialLinks: [],
  },
]
