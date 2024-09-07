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
        exportOnly?: boolean | undefined
        delta: Delta
      }>
    | undefined
}

export type LayoutTrackValue = {
  content: {
    main: LayoutGroup
    floating: Record<`${'top | bottom'}-${'left' | 'right'}`, LayoutGroupItem>
  } | null
  actions?:
    | Array<{
        _id: string
        atMs: number
        value: LayoutTrackActionValue
      }>
    | undefined
}

export type LayoutTrackActionValue = {
  type: 'delta'
  delta: Delta
}

export type LayoutGroup = {
  _id: string
  _tag: 'LayoutGroup'
  direction: 'horizontal' | 'vertical'
  content: Array<LayoutGroupItem>
}

export type LayoutGroupItem = {
  _id: string
  _tag: 'LayoutGroupItem'
  content:
    | LayoutGroup
    | {
        trackId: string
        defaultSize: number
      }
}
