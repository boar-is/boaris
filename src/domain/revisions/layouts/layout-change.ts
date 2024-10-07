import type { Id } from '~/src/shared/id'
import type { LayoutValue } from './layout-value'

export type LayoutChange = {
  /**
   * id is needed for patching optimizations
   */
  _id: Id
  /**
   * a number from 0 to 1
   */
  at: number
  /**
   * null is for skip
   */
  value: LayoutValue | null
}
