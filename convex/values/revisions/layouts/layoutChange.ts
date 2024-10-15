import { v } from 'convex/values'
import { layoutChangeValue } from './layoutChangeValue'

export const layoutChange = v.object({
  /**
   * id is needed for patching optimizations
   */
  id: v.string(),
  /**
   * a number from 0 to 1
   */
  at: v.number(),
  /**
   * null is for skip
   */
  value: v.optional(layoutChangeValue),
})

export type LayoutChange = typeof layoutChange.type
