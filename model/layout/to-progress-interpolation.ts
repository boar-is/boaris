import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { toFixedNumber } from '~/model/number/to-fixed-number'
import { ensureDefined } from '~/model/unknown/ensure-defined'

export const toProgressInterpolation = (
  changes: Array<{ at: number; value?: unknown | undefined }>,
  digits = 5,
): Interpolation => {
  let trueRatio = 0

  for (let i = 0; i < changes.length; i++) {
    const { at, value } = ensureDefined(changes[i])

    if (!value) {
      continue
    }

    const start = ensureDefined(at)
    const end = changes[i + 1]?.at

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixed = toFixedNumber()(digits)

  const input: Array<number> = []
  const output: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < changes.length; i++) {
    const { at, value } = ensureDefined(changes[i])

    if (!value) {
      continue
    }

    const start = ensureDefined(at)
    const end = changes[i + 1]?.at ?? 1

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    input.push(toFixed(startingRatio), toFixed(mappedInputEnd))
    output.push(toFixed(start), toFixed(end))

    startingRatio = mappedInputEnd
  }

  return {
    input,
    output,
  }
}
