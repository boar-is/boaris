import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export type TagDoc = Doc & {
  name: string
} & (
    | {
        iconId?: StorageDoc['_id'] | undefined
        iconName?: never
      }
    | {
        iconName?: string | undefined
        iconId?: never
      }
  )

export class TagRepository {
  static #data: ReadonlyArray<TagDoc> = [
    {
      _id: '1',
      name: 'TypeScript',
      iconName: 'typescript',
      _creationTime: Date.now(),
    },
    {
      _id: '2',
      name: 'React',
      iconName: 'react',
      _creationTime: Date.now(),
    },
  ]

  static findMany(ids: ReadonlyArray<TagDoc['_id']>) {
    return TagRepository.#data.filter((it) => ids.includes(it._id))
  }
}
