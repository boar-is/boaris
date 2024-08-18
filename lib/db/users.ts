import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from './storages'

export type UserDoc = Doc & {
  name: string
  slug: string
  avatarId?: StorageDoc['_id'] | undefined
}

export class UserRepository {
  static #data: ReadonlyArray<UserDoc> = [
    {
      _id: '1',
      name: 'Boris Zubchenko',
      slug: 'boris',
      avatarId: '1',
      _creationTime: Date.now(),
    },
  ]

  static findOne(id: UserDoc['_id']) {
    return UserRepository.#data.find((it) => it._id === id)
  }

  static findMany(ids: ReadonlyArray<UserDoc['_id']>) {
    return UserRepository.#data.filter((it) => ids.includes(it._id))
  }
}
