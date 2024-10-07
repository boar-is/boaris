export type LayoutLayer = {
  /**
   * Values are track IDs or a null token (`.`)
   */
  readonly areas: ReadonlyArray<ReadonlyArray<string>>
  readonly columns: ReadonlyArray<string>
  readonly rows: ReadonlyArray<string>
}
