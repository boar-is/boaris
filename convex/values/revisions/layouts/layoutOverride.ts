import { type Infer, v } from 'convex/values'
import { layoutMode } from './layoutMode'

export const layoutOverride = v.object({
  modes: v.optional(v.array(layoutMode)),
  minWidthPx: v.optional(v.number()),
  disabled: v.optional(v.boolean()),
  /**
   * @see Delta
   */
  changesDelta: v.any(),
})

export type LayoutOverride = Infer<typeof layoutOverride>
