import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'
import { LayoutChange, layoutChange } from './layoutChange'
import { LayoutMode, layoutMode } from './layoutMode'
import { LayoutOverride, layoutOverride } from './layoutOverride'

export const layout = v.object({
  modes: v.array(layoutMode),
  changes: v.array(layoutChange),
  overrides: v.array(layoutOverride),
})

export class Layout extends S.Class<Layout>('Layout')({
  modes: S.HashSet(LayoutMode),
  changes: S.Array(LayoutChange),
  overrides: S.Array(LayoutOverride),
}) {
  static encodedFromEntity({
    modes,
    changes,
    overrides,
  }: Infer<typeof layout>): typeof Layout.Encoded {
    return {
      modes,
      changes: changes.map(LayoutChange.encodedFromEntity),
      overrides: overrides.map(LayoutOverride.encodedFromEntity),
    }
  }
}
