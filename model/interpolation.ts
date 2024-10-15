import { fixed } from './number'
import { ensuredDefined } from './unknown'

export type Interpolation<T = number> = {
  input: Array<number>
  output: Array<T>
}

export const remappedFalsyOutput = (
  { input, output }: Interpolation<unknown>,
  digits = 5,
): Interpolation<number> => {
  if (input.length !== output.length) {
    throw new Error('Inputs and output arrays must be of the same length')
  }

  let trueRatio = 0
  for (let i = 0; i < input.length; i++) {
    if (!output[i]) {
      continue
    }

    const start = ensuredDefined(input[i])
    const end = input[i + 1]

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixed = fixed()(digits)

  const remappedInput: Array<number> = []
  const remappedOutput: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < input.length; i++) {
    if (output[i] === false) {
      continue
    }

    const start = ensuredDefined(input[i])
    const end = input[i + 1] ?? 1

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    remappedInput.push(toFixed(startingRatio), toFixed(mappedInputEnd))
    remappedOutput.push(toFixed(start), toFixed(end))

    startingRatio = mappedInputEnd
  }

  return {
    input: remappedInput,
    output: remappedOutput,
  }
}
