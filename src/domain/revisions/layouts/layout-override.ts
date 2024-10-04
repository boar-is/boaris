import type { Delta } from '~/src/shared/delta'
import type { Id } from '~/src/shared/id'
import type { LayoutMode } from './layout-mode'

export type LayoutOverride = {
  readonly _id: Id
  readonly modes: ReadonlyArray<LayoutMode>
  readonly minWidthPx: number | null
  readonly disabled: boolean
  readonly valueDelta: Delta
}
