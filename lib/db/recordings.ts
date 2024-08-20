export type Recording<T extends { type: string }> = {
  _id: string
  _creationTime: number
  durationMs: number
  /**
   * Percent-based progress to event
   */
  events: Array<[at: number, event: T]>
}
