import { v } from 'convex/values'

export const layoutLayer = v.object({
  /**
   * Values are track IDs or a null token (`.`)
   */
  areas: v.string(),
  columns: v.optional(v.string()),
  rows: v.optional(v.string()),
})

export type LayoutLayer = typeof layoutLayer.type
