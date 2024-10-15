export type LayoutMode = 'static' | 'scrolling' | 'watching' | 'sliding'

/**
 * Undefined or empty array means all modes
 */
export type LayoutModes = Array<LayoutMode> | null
