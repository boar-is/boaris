export const defined = <T>(
  value: T | undefined,
  message = 'the value is undefined',
): T => {
  if (value === undefined) {
    throw new Error(message)
  }
  return value
}

export const nonNull = <T>(
  value: T | null,
  message = 'the value is null',
): T => {
  if (value === null) {
    throw new Error(message)
  }
  return value
}

export const present = <T>(
  value: T | null | undefined,
  message = 'the value is null or undefined',
): T => {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
  return value
}
