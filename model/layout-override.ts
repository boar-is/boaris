import type { Delta } from './delta'
import type { LayoutModes } from './layout-mode'

export type LayoutOverride = {
  name?: string | undefined
  modes: LayoutModes
  minWidthPx?: number | undefined
  disabled?: boolean | undefined
  changesDelta: Delta
}
