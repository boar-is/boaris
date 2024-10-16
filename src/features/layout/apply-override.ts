import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import type { LayoutOverride } from '~/convex/values/revisions/layouts/layoutOverride'
import { diffpatcher } from '~/lib/diffpatcher'

export const applyOverride = ({
  changes,
  override,
}: {
  changes: Array<LayoutChange>
  override?: LayoutOverride | undefined
}) => {
  return diffpatcher.patch(
    changes,
    override?.changesDelta,
  ) as Array<LayoutChange>
}
