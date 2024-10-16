import { toFixed } from './to-fixed'

export const remapFalsyOutput = (
  {
    input,
    output,
  }: {
    input: Array<number>
    output: Array<unknown>
  },
  digits = 5,
): {
  input: Array<number>
  output: Array<number>
} => {
  if (input.length !== output.length) {
    throw new Error('Inputs and output arrays must be of the same length')
  }

  let trueRatio = 0
  for (let i = 0; i < input.length; i++) {
    if (!output[i]) {
      continue
    }

    const start = input[i]!
    const end = input[i + 1]

    trueRatio += (end ?? 1) - start
  }

  const multiplier = 1 / trueRatio

  const toFixedDigits = toFixed(digits)

  const remappedInput: Array<number> = []
  const remappedOutput: Array<number> = []

  let startingRatio = 0
  for (let i = 0; i < input.length; i++) {
    if (output[i] === false) {
      continue
    }

    const start = input[i]!
    const end = input[i + 1] ?? 1

    const mappedInputEnd = startingRatio + (end - start) * multiplier

    remappedInput.push(
      toFixedDigits(startingRatio),
      toFixedDigits(mappedInputEnd),
    )
    remappedOutput.push(toFixedDigits(start), toFixedDigits(end))

    startingRatio = mappedInputEnd
  }

  return {
    input: remappedInput,
    output: remappedOutput,
  }
}
