import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { Delta, delta } from './_shared/delta'
import { LayoutMode, layoutMode } from './layoutMode'

export const layoutOverride = v.object({
  name: v.optional(v.string()),
  modes: v.array(layoutMode),
  minWidth: v.optional(v.number()),
  disabled: v.boolean(),
  changesDelta: delta,
})

export class LayoutOverride extends S.Class<LayoutOverride>('LayoutOverride')({
  name: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  modes: S.NonEmptyArray(LayoutMode),
  minWidth: S.OptionFromUndefinedOr(S.Number),
  changesDelta: Delta,
}) {}
