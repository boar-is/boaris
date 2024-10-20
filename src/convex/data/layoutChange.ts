import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
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
  value: S.OptionFromUndefinedOr(LayoutLayers),
}) {}
