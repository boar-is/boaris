import type { Delta } from '~/src/shared/delta'

export type LayoutChange = {
  readonly _id: string
  /**
   * a number from 0 to 1
   */
  readonly at: number
  readonly value:
    | {
        type: 'delta'
        delta: Delta
      }
    | {
        type: 'skip'
      }
}
