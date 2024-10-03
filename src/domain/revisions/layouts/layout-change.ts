import type { Delta } from '~/src/shared/delta'
import type { Id } from '~/src/shared/id'

export type LayoutChange = {
  readonly _id: Id
  /**
   * a number from 0 to 1
   */
  readonly at: number
  readonly value:
    | {
        type: 'delta'
        contentDelta: Delta
      }
    | {
        type: 'skip'
      }
}
