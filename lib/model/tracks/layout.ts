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

export type LayoutTrackValue = {
  content: {
    main: LayoutGroup
    floating?:
      | Record<`${'top' | 'bottom'}-${'left' | 'right'}`, LayoutItem>
      | undefined
  } | null
  actions?:
    | Array<{
        _id: string
        atMs: number
        value: LayoutTrackActionValue
      }>
    | undefined
}

export type LayoutTrackActionValue =
  | {
      type: 'Delta'
      delta: Delta
    }
  | {
      type: 'Skip'
    }

export type LayoutGroup = {
  _id: string
  _tag: 'LayoutGroup'
  direction: 'horizontal' | 'vertical'
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
