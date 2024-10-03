import type { Id } from '~/src/shared/id'

export type TextTrackAction = {
  readonly _id: Id
  readonly atMs: number
  readonly value:
    | {
        readonly type: 'Insert'
        readonly from: number
        readonly to?: number | undefined
        readonly insert: string
      }
    | {
        readonly type: 'Select'
        readonly ranges: ReadonlyArray<{
          readonly anchor: number
          readonly head?: number
        }>
      }
}
