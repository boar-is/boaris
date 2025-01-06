const createPositionToProgress = (docSize: number) => (pos: number) => {
  const factor = 10 ** 4
  return Math.round((pos / docSize) * factor) / factor
}

export const pp1 = createPositionToProgress(10844)
