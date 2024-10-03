export const ensureDefined = <T>(
  value: T | undefined,
  message = 'the value is undefined',
): T => {
  if (value === undefined) {
    throw new Error(message)
  }
  return value
}

export const ensureNonNull = <T>(
  value: T | null,
  message = 'the value is null',
): T => {
  if (value === null) {
    throw new Error(message)
  }
  return value
}
