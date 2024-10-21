import { diffpatcher } from '~/lib/diffpatcher'
import type { LayoutChange } from '~/model/layoutChange'
import type { LayoutOverride } from '~/model/layoutOverride'

export const applyOverrideDelta = (
  changes: ReadonlyArray<typeof LayoutChange.Type>,
  delta: (typeof LayoutOverride.Type)['changesDelta'],
) => {
  return diffpatcher.patch(changes, delta) as ReadonlyArray<
    typeof LayoutChange.Type
  >
}
