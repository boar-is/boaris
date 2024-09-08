import type { Delta } from '~/lib/diffpatcher'

export const layoutModes = [
  'static',
  'scrolling',
  'watching',
  'sliding',
] as const

export type Layout = {
  primary: {
    modes: Array<(typeof layoutModes)[number]>
    value: LayoutValue
  }
  overrides?:
    | Array<{
        _id: string
        modes: Array<(typeof layoutModes)[number]>
        minWidthPx?: number | undefined
        disabled?: boolean | undefined
        delta: Delta
      }>
    | undefined
}

export type LayoutContent = {
  main: LayoutGroup
  floating?:
    | Record<`${'top' | 'bottom'}-${'left' | 'right'}`, LayoutItem>
    | undefined
}

export type LayoutValue = {
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
