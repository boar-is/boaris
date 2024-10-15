export const fixed =
  (base = 10) =>
  (digits = 2) =>
  (num: number) => {
    const pow = base ** digits
    return Math.round(num * pow) / pow
  }
