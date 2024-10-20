import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { layoutLayer } from './layoutLayer'

export const layoutLayers = v.object({
  main: v.optional(layoutLayer),
  overlay: v.optional(layoutLayer),
})

export class LayoutLayers extends S.Class<LayoutLayers>('LayoutLayers')({
  main: S.OptionFromUndefinedOr(PostLayoutLayer),
  overlay: S.OptionFromUndefinedOr(PostLayoutLayer),
}) {}
