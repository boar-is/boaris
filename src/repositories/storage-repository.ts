import type { StorageFile } from '~/src/domain/storage/storage-file'
import type { Id } from '../shared/id'

const _storageFileRepository: Array<StorageFile> = [
  {
    _id: 'F6gGQOuGSZGr',
    _creationTime: Date.now(),
    url: 'https://avatars.githubusercontent.com/u/31354262?v=4',
  },
  {
    _id: 'OPIQS4RJ3szf',
    _creationTime: Date.now(),
    url: '/logo.png',
  },
  {
    _id: 'az9dKDemcJxE',
    _creationTime: Date.now(),
    url: 'https://picsum.photos/seed/3/1024/768',
  },
  {
    _id: 'ZxfWHzsajN9w',
    _creationTime: Date.now(),
    url: '/deferred-example/shadow-palette-initial.mp4',
  },
  {
    _id: 'zNCYjhOo5NPl',
    _creationTime: Date.now(),
    url: '/deferred-example/css-snippet.webp',
  },
]

const getUrl = (_id: Id) => {
  const url = _storageFileRepository.find((it) => it.url)?.url

  if (!url) {
    throw new Error(`File with ID ${_id} not found`)
  }

  return url
}

type StorageMap = Record<Id, string>
const getStorageMap = async (_ids: Array<Id | null>): Promise<StorageMap> => {
  return Object.fromEntries(
    await Promise.all(
      [...new Set(_ids)]
        .filter((id) => id !== null)
        .map((id) => [id, getUrl(id)] as const),
    ),
  )
}

export const storageRepository = {
  getUrl,
  getStorageMap,
} as const
