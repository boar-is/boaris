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
  main?: LayoutGrid | undefined
  floating?: LayoutGrid | undefined
}

export type LayoutChangeValue =
  | {
      type: 'delta'
      delta: Delta
    }
  | {
      type: 'skip'
    }

export type LayoutValue = {
  changes: Array<{
    _id: string
    /**
     * a number from 0 to 1
     */
    at: number
    value: LayoutChangeValue
  }>
}

export type LayoutGrid = {
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: Array<Array<string>>
  columns?: Array<string> | undefined
  rows?: Array<string> | undefined
}
