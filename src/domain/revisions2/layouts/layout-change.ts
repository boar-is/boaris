import type { Id } from '~/src/shared/id'
import type { LayoutValue } from './layout-value'

export type LayoutChange = {
  readonly _id: Id
  /**
   * a number from 0 to 1
   */
  readonly at: number
  /**
   * null is for skip
   */
  readonly value: LayoutValue | null
}
