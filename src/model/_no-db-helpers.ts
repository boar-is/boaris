const createPositionToProgress = (docSize: number) => (pos: number) => {
  const factor = 10 ** 4
  return Math.round((pos / docSize) * factor) / factor
}

export const s1 = 10098
export const pp1 = createPositionToProgress(s1)

export const simulateReq = <T>(thunk: () => T, ms = 100) =>
  new Promise((resolve: (value: T) => void) =>
    setTimeout(() => resolve(thunk()), ms),
  )
