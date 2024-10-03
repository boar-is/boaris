import type { LayoutGrid } from './layout-grid'

export type LayoutContent = {
  readonly main?: LayoutGrid | undefined
  readonly floating?: LayoutGrid | undefined
}
