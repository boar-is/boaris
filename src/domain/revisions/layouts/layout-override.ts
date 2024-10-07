import type { Delta } from '~/src/shared/delta'
import type { LayoutMode } from './layout-mode'

export type LayoutOverride = {
  readonly modes: ReadonlyArray<LayoutMode>
  readonly minWidthPx: number | null
  readonly disabled: boolean
  readonly actionsDelta: Delta
}
