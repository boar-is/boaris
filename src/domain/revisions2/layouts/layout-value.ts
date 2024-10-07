import type { LayoutLayer } from './layout-layer'

export type LayoutValue = {
  readonly static: LayoutLayer | null
  readonly floating: LayoutLayer | null
}
