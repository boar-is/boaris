import type { LayoutGrid } from './layout-grid'

export type LayoutContent = {
  readonly main: LayoutGrid | null
  readonly floating: LayoutGrid | null
}
