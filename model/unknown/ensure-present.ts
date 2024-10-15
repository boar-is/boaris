export const ensurePresent = <T>(
  value: T | null | undefined,
  message = 'the value is null or undefined',
): T => {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
  return value
}
