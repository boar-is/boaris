import type { LayoutLayer } from './layout-layer'

export type LayoutValue = {
  static: LayoutLayer | null
  floating: LayoutLayer | null
}
