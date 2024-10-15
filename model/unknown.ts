export const ensuredDefined = <T>(
  value: T | undefined,
  message = 'the value is undefined',
): T => {
  if (value === undefined) {
    throw new Error(message)
  }
  return value
}

export const ensuredNonNull = <T>(
  value: T | null,
  message = 'the value is null',
): T => {
  if (value === null) {
    throw new Error(message)
  }
  return value
}

export const ensuredPresent = <T>(
  value: T | null | undefined,
  message = 'the value is null or undefined',
): T => {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
  return value
}
