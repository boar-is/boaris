import { type Infer, v } from 'convex/values'
import { type HashSet, Schema } from 'effect'
import { diffpatcher } from '~/lib/diffpatcher'
import type { LayoutChange } from '~/model/layoutChange'
import { Delta, delta } from './delta'
import { LayoutMode, layoutMode } from './layoutMode'

export const layoutOverride = v.object({
  name: v.optional(v.string()),
  modes: v.array(layoutMode),
  minWidth: v.optional(v.number()),
  disabled: v.boolean(),
  changesDelta: delta,
})

export class LayoutOverride extends Schema.Class<LayoutOverride>(
  'LayoutOverride',
)({
  name: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  modes: Schema.HashSet(LayoutMode),
  minWidth: Schema.OptionFromUndefinedOr(Schema.Number),
  changesDelta: Delta,
}) {
  static encodedFromEntity({
    name,
    modes,
    minWidth,
    changesDelta,
  }: Infer<typeof layoutOverride>): typeof LayoutOverride.Encoded {
    return {
      name,
      modes,
      minWidth,
      changesDelta,
    }
  }
}

export const determinedOverride = ({
  mode,
  modes,
  overrides,
  width,
  includeDisabled = false,
}: {
  readonly mode: typeof LayoutMode.Type
  readonly modes: HashSet.HashSet<typeof LayoutMode.Type>
  readonly overrides: ReadonlyArray<typeof LayoutOverride.Type>
  readonly width: number
  readonly includeDisabled?: boolean | undefined
}) => {
  // TODO Implement
  return undefined
}

export const applyOverrideDelta = (
  changes: ReadonlyArray<typeof LayoutChange.Type>,
  delta: (typeof LayoutOverride.Type)['changesDelta'],
) => {
  return diffpatcher.patch(changes, delta) as ReadonlyArray<
    typeof LayoutChange.Type
  >
}
