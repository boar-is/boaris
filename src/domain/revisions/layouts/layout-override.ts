import type { Delta } from '~/src/shared/delta'
import type { LayoutMode } from './layout-mode'

export type LayoutOverride = {
  readonly _id: string
  readonly modes: ReadonlyArray<LayoutMode>
  readonly minWidthPx?: number | undefined
  readonly disabled?: boolean | undefined
  readonly delta: Delta
}
