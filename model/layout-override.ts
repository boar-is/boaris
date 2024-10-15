import type { Delta } from './delta'
import type { LayoutMode, LayoutModes } from './layout-mode'

export type LayoutOverride = {
  modes: LayoutModes
  minWidthPx?: number | undefined
  disabled?: boolean | undefined
  changesDelta: Delta
}

const matchedOverride = (
  array: Array<LayoutOverride>,
  layoutMode: LayoutMode,
  windowWidth?: number | undefined,
) => {
  return array.find((it) => {
    const matchedMode = it.modes?.includes(layoutMode)

    return (
      it.modes?.includes(layoutMode) &&
      (!it.minWidthPx || !windowWidth || windowWidth >= it.minWidthPx)
    )
  })
}
