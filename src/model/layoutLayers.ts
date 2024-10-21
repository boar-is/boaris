import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { LayoutLayer, layoutLayer } from './layoutLayer'

export const layoutLayers = v.object({
  main: v.optional(layoutLayer),
  overlay: v.optional(layoutLayer),
})

export class LayoutLayers extends S.Class<LayoutLayers>('LayoutLayers')({
  main: S.OptionFromUndefinedOr(LayoutLayer),
  overlay: S.OptionFromUndefinedOr(LayoutLayer),
}) {
  static encodedFromEntity({
    main,
    overlay,
  }: Infer<typeof layoutLayers>): typeof LayoutLayers.Encoded {
    return {
      main: main && LayoutLayer.encodedFromEntity(main),
      overlay: overlay && LayoutLayer.encodedFromEntity(overlay),
    }
  }
}
