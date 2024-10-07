import type { LayoutChange } from './layout-change'
import type { LayoutMode } from './layout-mode'

export type LayoutPrimary = {
  modes: Array<LayoutMode>
  changes: Array<LayoutChange>
}
