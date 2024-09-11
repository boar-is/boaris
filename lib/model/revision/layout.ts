import type { Delta } from '~/lib/diffpatcher'

export type LayoutMode = (typeof layoutModes)[number]

export const layoutModes = [
  'static',
  'scrolling',
  'watching',
  'sliding',
] as const

export type Layout = {
  primary: {
    modes: Array<LayoutMode>
    value: LayoutValue
  }
  overrides?:
    | Array<{
        _id: string
        modes: Array<LayoutMode>
        minWidthPx?: number | undefined
        disabled?: boolean | undefined
        delta: Delta
      }>
    | undefined
}

export type LayoutContent = {
  main?: LayoutGroup | undefined
  floating?:
    | Record<`${'top' | 'bottom'}-${'left' | 'right'}`, LayoutItem>
    | undefined
}

export type LayoutValue = {
  changes?:
    | Array<{
        _id: string
        /**
         * a number from 0 to 1
         */
        at: number
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
