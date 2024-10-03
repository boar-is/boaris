export type LayoutGrid = {
  /**
   * Values are track IDs or a null token (`.`)
   */
  readonly areas: Array<Array<string>>
  readonly columns?: Array<string> | undefined
  readonly rows?: Array<string> | undefined
}
