import { v } from 'convex/values'
import { layoutLayers } from './layoutLayers'

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
   * undefined is for skip
   */
  layers: v.optional(layoutLayers),
})
