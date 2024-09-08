import type { Delta } from '~/lib/diffpatcher'

export type LayoutTrack = {
  _id: string
  _tag: 'LayoutTrack'
  value: LayoutTrackValue
  overrides?:
    | Array<{
        _id: string
        modes: Array<'static' | 'scrolling' | 'watching' | 'sliding'>
        minWidthPx?: number | undefined
        disabled?: boolean | undefined
        delta: Delta
      }>
    | undefined
}

export type LayoutTrackContent = {
  main: LayoutGroup
  floating?:
    | Record<`${'top' | 'bottom'}-${'left' | 'right'}`, LayoutItem>
    | undefined
}

export type LayoutTrackValue = {
  actions?:
    | Array<{
        _id: string
        atMs: number
        /**
         * `null` to skip that part
         */
        value: LayoutTrackActionValue | null
      }>
    | undefined
}

export type LayoutTrackActionValue = {
  type: 'Delta'
  delta: Delta
}

export type LayoutGroup = {
  _id: string
  _tag: 'LayoutGroup'
  direction: 'h' | 'v'
  content: Array<LayoutItem>
}

export type LayoutItem = {
  _id: string
  _tag: 'LayoutItem'
  content:
    | LayoutGroup
    | {
        trackId: string
        sizeProportion: number
      }
}
