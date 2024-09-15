import { toFixedNumber } from '~/lib/number'
import { ensureDefined } from '~/lib/utils'

export const mapSkippedPair = (
  inputs: Array<number>,
  outputs: Array<boolean>,
  digits = 5,
) => {
  if (inputs.length !== outputs.length) {
    throw new Error('Inputs and output arrays must be of the same length')
  }

  let trueRatio = 0
  for (let i = 0; i < inputs.length; i++) {
    if (outputs[i] === false) {
      continue
    }

    const start = ensureDefined(inputs[i])
    const end = inputs[i + 1]

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixed = toFixedNumber()(digits)

  const mappedInputs: Array<number> = []
  const mappedOutputs: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < inputs.length; i++) {
    if (outputs[i] === false) {
      continue
    }

    const start = ensureDefined(inputs[i])
    const end = inputs[i + 1] ?? 1

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    mappedInputs.push(toFixed(startingRatio), toFixed(mappedInputEnd))
    mappedOutputs.push(toFixed(start), toFixed(end))

    startingRatio = mappedInputEnd
  }

  return [mappedInputs, mappedOutputs] as const
}
