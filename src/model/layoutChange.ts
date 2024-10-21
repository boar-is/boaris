import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type * as HS from 'effect/HashSet'
import { applyOverrideDelta } from '~/features/apply-override-delta'
import type { LayoutMode } from '~/model/layoutMode'
import { type LayoutOverride, determinedOverride } from '~/model/layoutOverride'
import { LayoutLayers, layoutLayers } from './layoutLayers'

export const layoutChange = v.object({
  /**
   * id is needed for patching optimizations
   */
  id: v.string(),
  /**
   * a number from 0 to 1
   */
  at: v.number(),
  /**
   * undefined is for skip
   */
  layers: v.optional(layoutLayers),
})

export class LayoutChange extends S.Class<LayoutChange>('LayoutChange')({
  id: S.NonEmptyTrimmedString,
  at: S.Number,
  layers: S.OptionFromUndefinedOr(LayoutLayers),
}) {
  static encodedFromEntity({
    id,
    at,
    layers,
  }: Infer<typeof layoutChange>): typeof LayoutChange.Encoded {
    return {
      id,
      at,
      layers: layers && LayoutLayers.encodedFromEntity(layers),
    }
  }
}

export const determinedLayoutChanges = ({
  changes,
  layoutMode,
  layoutModes,
  overrides,
  width,
  includeDisabled = false,
}: {
  changes: Array<typeof LayoutChange.Type>
  layoutMode: typeof LayoutMode.Type
  layoutModes: HS.HashSet<typeof LayoutMode.Type>
  overrides: Array<typeof LayoutOverride.Type>
  width: number
  includeDisabled?: boolean | undefined
}) => {
  const override = determinedOverride({
    layoutMode,
    layoutModes,
    overrides,
    width,
    includeDisabled,
  })

  return applyOverrideDelta(changes, override)
}
