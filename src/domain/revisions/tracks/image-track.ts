import type { ImageTrackValue } from './image-track-value'

export type ImageTrack = {
  _id: string
  _tag: 'ImageTrack'
  name: string
  value: ImageTrackValue
  overrides?:
    | Array<{
        _id: string
        locale: string
        value: ImageTrackValue
      }>
    | undefined
}
