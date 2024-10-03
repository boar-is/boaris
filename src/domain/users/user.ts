import type { Entity } from '~/src/shared/entity'

export type User = Entity & {
  readonly name: string
  readonly slug: string
  readonly avatarId: Entity['_id'] | null
  readonly socialLinks: ReadonlyArray<string> | null
}

export const userRepository: ReadonlyArray<User> = [
  {
    _id: 'QcXfwMYqlHu5',
    _creationTime: Date.now(),
    name: 'Boris Zubchenko',
    slug: 'boris',
    avatarId: 'F6gGQOuGSZGr',
    socialLinks: null,
  },
]
