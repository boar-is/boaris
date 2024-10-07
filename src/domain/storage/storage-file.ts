import type { Id } from '~/src/shared/id'

export type StorageFile = {
  _id: Id
  _creationTime: number
  src: string
}

export const storageFileRepository: Array<StorageFile> = [
  {
    _id: 'F6gGQOuGSZGr',
    _creationTime: Date.now(),
    src: 'https://avatars.githubusercontent.com/u/31354262?v=4',
  },
  {
    _id: 'OPIQS4RJ3szf',
    _creationTime: Date.now(),
    src: '/logo.png',
  },
  {
    _id: 'az9dKDemcJxE',
    _creationTime: Date.now(),
    src: 'https://picsum.photos/seed/3/1024/768',
  },
  {
    _id: 'ZxfWHzsajN9w',
    _creationTime: Date.now(),
    src: '/deferred-example/shadow-palette-initial.mp4',
  },
  {
    _id: 'zNCYjhOo5NPl',
    _creationTime: Date.now(),
    src: '/deferred-example/css-snippet.webp',
  },
]
