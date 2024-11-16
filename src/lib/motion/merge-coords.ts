export type Coords = {
  left: number
  right: number
  top: number
  bottom: number
}

export const mergeCoords = (a: Coords, b: Coords): Coords => ({
  left: Math.min(a.left, b.left),
  right: Math.max(a.right, b.right),
  top: Math.min(a.top, b.top),
  bottom: Math.max(a.bottom, b.bottom),
})
