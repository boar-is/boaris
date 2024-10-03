import type { Doc } from '~/lib/model/docs/_shared'
import type { StorageDoc } from '~/lib/model/docs/storages'

export type TagDoc = Doc & {
  name: string
  slug: string
  iconId?: StorageDoc['_id'] | undefined
}

export const tagDocs: ReadonlyArray<TagDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    name: 'TypeScript',
    slug: 'typescript',
  },
  {
    _id: '2',
    _creationTime: Date.now(),
    name: 'React',
    slug: 'react',
  },
]
