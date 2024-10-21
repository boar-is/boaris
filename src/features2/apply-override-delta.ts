import type { LayoutChange } from '~/convex/data/layoutChange'
import type { LayoutOverride } from '~/convex/data/layoutOverride'
import { diffpatcher } from '~/lib/diffpatcher'

export const applyOverrideDelta = ({
  changes,
  delta,
}: {
  changes: Array<typeof LayoutChange.Type>
  delta: (typeof LayoutOverride.Type)['changesDelta']
}) => {
  return diffpatcher.patch(changes, delta) as Array<typeof LayoutChange.Type>
}
