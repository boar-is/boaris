import type { LayoutChange } from './layout-change'
import type { LayoutMode } from './layout-mode'

export type LayoutPrimary = {
  readonly modes: ReadonlyArray<LayoutMode>
  readonly changes: ReadonlyArray<LayoutChange>
}
