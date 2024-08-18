import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export type TagDoc = Doc & {
  name: string
  slug: string
  iconId?: StorageDoc['_id'] | undefined
}

export class TagRepository {
  static #data: ReadonlyArray<TagDoc> = [
    {
      _id: '1',
      name: 'TypeScript',
      slug: 'typescript',
      _creationTime: Date.now(),
    },
    {
      _id: '2',
      name: 'React',
      slug: 'react',
      _creationTime: Date.now(),
    },
  ]

  static findMany(ids: ReadonlyArray<TagDoc['_id']>) {
    return TagRepository.#data.filter((it) => ids.includes(it._id))
  }
}
