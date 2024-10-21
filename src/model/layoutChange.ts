import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { applyOverrideDelta } from '~/features/apply-override-delta'
import { determinedOverride } from '~/model/layoutOverride'
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
  ...determineOverrideProps
}: Parameters<typeof determinedOverride>[number] & {
  readonly changes: ReadonlyArray<typeof LayoutChange.Type>
}) => {
  const override = determinedOverride(determineOverrideProps)
  return applyOverrideDelta(changes, override)
}
