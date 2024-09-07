/**
 * `null` output's for void, i.e., nothing happens
 */
export type Interpolation<T = number> = Array<[input: number, output: T | null]>

export type PathWithExtensions<T extends ReadonlyArray<string>> =
  `${string}.${T[number]}`

export type Recording<T extends { type: string }, E> = {
  _id: string
  _creationTime: number
  durationMs: number
  /**
   * Percent-based progress to event
   */
  events: Array<[at: number, event: T]>
  initialValue: E
}

export type TrackBase = {
  _id: string
  path: string
}
