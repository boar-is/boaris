export const toFixed =
  (digits = 2) =>
  (num: number) => {
    const pow = 10 ** digits
    return Math.round(num * pow) / pow
  }
