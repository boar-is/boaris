export const layoutModes = [
  'static',
  'scrolling',
  'watching',
  'sliding',
] as const

export type LayoutMode = (typeof layoutModes)[number]
