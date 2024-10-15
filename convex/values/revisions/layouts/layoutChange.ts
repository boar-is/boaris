import { v } from 'convex/values'
import { layoutLayer } from './layoutLayer'

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
  value: v.optional(
    v.object({
      static: v.optional(layoutLayer),
      floating: v.optional(layoutLayer),
    }),
  ),
})

export type LayoutChange = typeof layoutChange.type
