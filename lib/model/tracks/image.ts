import type { StorageDoc } from '~/lib/model/docs/storages'

export const imageExtensions = ['webp'] as const

export type ImageTrackValue = {
  storageId: StorageDoc['_id']
}

export type ImageTrack = {
  _id: string
  _tag: 'ImageTrack'
  name: string
  items: Array<{
    locale?: string | undefined
    value: ImageTrackValue
  }>
}

export const imageTracks: Array<ImageTrack> = [
  {
    _id: 'image1',
    _tag: 'ImageTrack',
    name: '.meta/css-snippet.webp',
    items: [
      {
        value: {
          storageId: '5',
        },
      },
    ],
  },
]
