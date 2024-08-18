import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export type TagDoc = Doc & {
  name: string
  slug: string
  iconId?: StorageDoc['_id'] | undefined
}

export const tagDocs: ReadonlyArray<TagDoc> = [
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
