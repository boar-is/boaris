export const positionFromProgress = (docSize: number, progress: number) =>
  Math.floor(docSize - 1) * progress
