import type { Delta } from '~/src/shared/delta'
import type { LayoutMode } from './layout-mode'

export type LayoutOverride = {
  modes: Array<LayoutMode>
  minWidthPx: number | null
  disabled: boolean
  actionsDelta: Delta
}
