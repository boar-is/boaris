import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { toFixed } from '~/lib/utils/to-fixed'
import { Interpolation } from './interpolation'
import { LayoutLayer, layoutLayer } from './layoutLayer'

export const layoutChange = v.object({
  /**
   * id is needed for patching optimizations
   */
  id: v.string(),
  /**
   * a number from 0 to 1
   */
  offset: v.number(),
  value: v.optional(layoutLayer),
})

export class LayoutChange extends Schema.Class<LayoutChange>('LayoutChange')({
  id: Schema.NonEmptyTrimmedString,
  offset: Schema.Number,
  value: Schema.OptionFromUndefinedOr(LayoutLayer),
}) {
  static encodedFromEntity({
    id,
    offset,
    value,
  }: Infer<typeof layoutChange>): typeof LayoutChange.Encoded {
    return {
      id,
      offset,
      value: value && LayoutLayer.encodedFromEntity(value),
    }
  }
}

const defaultInterpolation = [0, 1]

export const layoutProgressInterpolationFromChanges = (
  changes: ReadonlyArray<{ readonly offset: number; readonly value?: unknown }>,
  digits = 5,
): typeof Interpolation.Type => {
  let trueRatio = 0
  for (let i = 0; i < changes.length; i++) {
    if (!changes[i]!.value) {
      continue
    }

    const start = changes[i]?.offset!
    const end = changes[i + 1]?.offset

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

    const start = changes[i]?.offset!
    const end = changes[i + 1]?.offset ?? 1

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
