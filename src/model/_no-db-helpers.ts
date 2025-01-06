const createPositionToProgress = (docSize: number) => (pos: number) => {
  const factor = 10 ** 4
  return Math.round((pos / docSize) * factor) / factor
}

export const s1 = 10844
export const pp1 = createPositionToProgress(s1)
