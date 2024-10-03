import type { Doc } from '~/lib/model/docs/_shared'
import type { StorageDoc } from './storages'

export type UserDoc = Doc & {
  name: string
  slug: string
  avatarId?: StorageDoc['_id'] | undefined
}

export const userDocs: ReadonlyArray<UserDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    name: 'Boris Zubchenko',
    slug: 'boris',
    avatarId: '1',
  },
]
