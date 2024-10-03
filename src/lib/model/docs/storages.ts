import type { Doc } from '~/lib/model/docs/_shared'

export type StorageDoc = Doc & {
  src: string
}

export const storageDocs: ReadonlyArray<StorageDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    src: 'https://avatars.githubusercontent.com/u/31354262?v=4',
  },
  {
    _id: '2',
    _creationTime: Date.now(),
    src: '/logo.png',
  },
  {
    _id: '3',
    _creationTime: Date.now(),
    src: 'https://picsum.photos/seed/3/1024/768',
  },
  {
    _id: '4',
    _creationTime: Date.now(),
    src: '/deferred-example/shadow-palette-initial.mp4',
  },
  {
    _id: '5',
    _creationTime: Date.now(),
    src: '/deferred-example/css-snippet.webp',
  },
]
