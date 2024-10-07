import type { LayoutOverride } from './layout-override'
import type { LayoutPrimary } from './layout-primary'

export type Layouts = {
  readonly primary: LayoutPrimary
  readonly overrides: ReadonlyArray<LayoutOverride>
}
