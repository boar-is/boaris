import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { LayoutChange, layoutChange } from './layoutChange'
import { LayoutMode, layoutMode } from './layoutMode'
import { LayoutOverride, layoutOverride } from './layoutOverride'

export const layout = v.object({
  modes: v.array(layoutMode),
  changes: v.array(layoutChange),
  overrides: v.array(layoutOverride),
})

export class Layout extends S.Class<Layout>('Layout')({
  modes: S.NonEmptyArray(LayoutMode),
  changes: S.Array(LayoutChange),
  overrides: S.Array(LayoutOverride),
}) {}
