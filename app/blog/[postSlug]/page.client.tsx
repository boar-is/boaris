'use client'

import { useWindowSize } from 'usehooks-ts'
import { diffpatcher } from '~/lib/diffpatcher'
import type {
  Layout,
  LayoutMode,
  LayoutValue,
} from '~/lib/model/revision/layout'

export function LayoutPlayer({ layout }: { layout: Layout | undefined }) {
  if (!layout) {
    return null
  }

  const currentMode: LayoutMode = 'scrolling'

  const { width = undefined } = useWindowSize({
    debounceDelay: 250,
  })

  if (!width) {
    return null
  }

  const override = layout.overrides?.find(
    (it) =>
      !it.disabled &&
      it.modes.includes(currentMode) &&
      (!it?.minWidthPx || width >= it.minWidthPx),
  )

  if (!(layout.primary.modes.includes(currentMode) && override)) {
    return null
  }

  const value = override
    ? (diffpatcher.patch(layout.primary, override.delta) as LayoutValue)
    : layout.primary.value

  const progress = 0.66

  const previousChangeIndex = 0
  const currentChangeIndex = value.changes.findIndex((it) => it.at <= progress)

  return <div>Layout</div>
}
