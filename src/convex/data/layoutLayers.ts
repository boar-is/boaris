import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { LayoutLayer, layoutLayer } from './layoutLayer'

export const layoutLayers = v.object({
  main: v.optional(layoutLayer),
  overlay: v.optional(layoutLayer),
})

export class LayoutLayers extends S.Class<LayoutLayers>('LayoutLayers')({
  main: S.OptionFromUndefinedOr(LayoutLayer),
  overlay: S.OptionFromUndefinedOr(LayoutLayer),
}) {}
