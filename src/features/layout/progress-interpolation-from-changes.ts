import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { toFixed } from '../../lib/utils/to-fixed'

export const progressInterpolationFromChanges = (
  changes: Array<{ at: number; value: unknown }>,
  digits = 5,
): Interpolation => {
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

  return { input, output }
}
