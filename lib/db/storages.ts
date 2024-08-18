import type { Doc } from '~/lib/db/_shared'

export type StorageDoc = Doc & {
  src: string
}

export const storageDocs: ReadonlyArray<StorageDoc> = [
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
  {
    _id: '3',
    src: 'https://picsum.photos/seed/promises/1024/768',
    _creationTime: Date.now(),
  },
]
