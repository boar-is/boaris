export type Doc = {
  _id: string
  _creationTime: number
}

/**
 * `null` output's for void, i.e., nothing happens
 */
export type Interpolation<T = number> = Array<[input: number, output: T | null]>

export type PathWithExtensions<T extends ReadonlyArray<string>> =
  `${string}.${T[number]}`
