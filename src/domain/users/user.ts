import type { StorageFile } from '~/src/domain/storage/storage-file'
import type { Entity } from '~/src/shared/entity'
import type { SocialLink } from '~/src/shared/social-link'

export type User = Entity & {
  readonly name: string
  readonly slug: string
  readonly avatarId: StorageFile['_id'] | null
  readonly socialLinks: ReadonlyArray<SocialLink>
}

export const userRepository: ReadonlyArray<User> = [
  {
    _id: 'QcXfwMYqlHu5',
    _creationTime: Date.now(),
    name: 'Boris Zubchenko',
    slug: 'boris',
    avatarId: 'F6gGQOuGSZGr',
    socialLinks: [],
  },
]
