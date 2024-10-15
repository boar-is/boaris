import { v } from 'convex/values'
import { layoutModes } from './layoutMode'

export const layoutOverride = v.object({
  modes: layoutModes,
  minWidthPx: v.optional(v.number()),
  disabled: v.optional(v.boolean()),
  /**
   * @see Delta
   */
  changesDelta: v.any(),
})
