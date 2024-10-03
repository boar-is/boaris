import type { LayoutMode } from './layout-mode'
import type { LayoutOverride } from './layout-override'
import type { LayoutValue } from './layout-value'

export type Layouts = {
  readonly modes: ReadonlyArray<LayoutMode>
  readonly value: LayoutValue
  /**
   * All overrides that extend the primary value
   */
  readonly overrides: ReadonlyArray<LayoutOverride> | null
}
