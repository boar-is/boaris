import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import type { LayoutOverride } from '~/convex/values/revisions/layouts/layoutOverride'

export const determineOverride = <
  OverrideT extends Pick<LayoutOverride, 'modes' | 'disabled' | 'minWidth'>,
>({
  currentLayoutMode,
  primaryLayoutModes,
  overrides,
  width,
  includeDisabled,
}: {
  currentLayoutMode: LayoutMode
  primaryLayoutModes?: Array<LayoutMode> | undefined
  overrides?: Array<OverrideT> | undefined
  width?: number | undefined
  includeDisabled?: boolean | undefined
}): OverrideT | undefined => {
  // TODO implement
  return undefined
}
