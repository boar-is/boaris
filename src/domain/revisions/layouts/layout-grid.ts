export type LayoutGrid = {
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: Array<Array<string>>
  columns?: Array<string> | undefined
  rows?: Array<string> | undefined
}
