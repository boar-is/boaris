import type { Doc } from '~/lib/db/_shared'

export type StorageDoc = Doc & {
  src: string
}

export class StorageRepository {
  static #data = [
    {
      _id: '1',
      src: 'https://avatars.githubusercontent.com/u/31354262?v=4',
      _creationTime: Date.now(),
    },
    {
      _id: '2',
      src: '/logo.png',
      _creationTime: Date.now(),
    },
  ] satisfies ReadonlyArray<StorageDoc>

  static findOneSrc(_id: StorageDoc['_id']) {
    return StorageRepository.#data.find((it) => it._id === _id)?.src
  }
}
