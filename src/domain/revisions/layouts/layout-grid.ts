export type LayoutGrid = {
  /**
   * Values are track IDs or a null token (`.`)
   */
  readonly areas: Array<Array<string>>
  readonly columns: Array<string> | null
  readonly rows: Array<string> | null
}
