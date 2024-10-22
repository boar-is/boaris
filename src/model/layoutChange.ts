import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { toFixed } from '~/lib/utils/to-fixed'
import { Interpolation } from '~/model/interpolation'
import { applyOverrideDelta, determinedOverride } from '~/model/layoutOverride'
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

const defaultInterpolation = [0, 1]

export const layoutProgressInterpolationFromChanges = (
  changes: ReadonlyArray<{ readonly at: number; readonly value?: unknown }>,
  digits = 5,
): typeof Interpolation.Type => {
  let trueRatio = 0
  for (let i = 0; i < changes.length; i++) {
    if (!changes[i]!.value) {
      continue
    }

    const start = changes[i]?.at!
    const end = changes[i + 1]?.at

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixedDigits = toFixed(digits)

  const input: Array<number> = []
  const output: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < changes.length; i++) {
    if (!changes[i]!.value) {
      continue
    }

    const start = changes[i]?.at!
    const end = changes[i + 1]?.at ?? 1

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    input.push(toFixedDigits(startingRatio), toFixedDigits(mappedInputEnd))
    output.push(toFixedDigits(start), toFixedDigits(end))

    startingRatio = mappedInputEnd
  }

  return new Interpolation({
    input: input.length ? input : defaultInterpolation,
    output: output.length ? output : defaultInterpolation,
  })
}
