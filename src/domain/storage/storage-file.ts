import type { Entity } from '~/src/shared/entity'

export type StorageFile = Entity & {
  readonly src: string
}

export const storageFileRepository: ReadonlyArray<StorageFile> = [
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
