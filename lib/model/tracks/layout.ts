import type { Delta } from '~/lib/diffpatcher'

export type LayoutTrack = {
  _id: string
  _tag: 'LayoutTrack'
  primary: {
    modes: Array<'static' | 'scrolling' | 'watching' | 'sliding'>
    value: LayoutTrackValue
  }
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
  changes?:
    | Array<{
        _id: string
        atMs: number
        /**
         * `null` to skip that part
         */
        delta: Delta | null
      }>
    | undefined
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
        basis?: number | undefined
      }
}
