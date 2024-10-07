import type { LayoutOverride } from './layout-override'
import type { LayoutPrimary } from './layout-primary'

export type Layouts = {
  primary: LayoutPrimary
  overrides: Array<LayoutOverride>
}
