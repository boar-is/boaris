import { v } from 'convex/values'

export const layoutMode = v.union(
  v.literal('static'),
  v.literal('scrolling'),
  v.literal('watching'),
  v.literal('sliding'),
)

/**t
 * Undefined or empty array means all modes
 */
export const layoutModes = v.union(v.array(layoutMode), v.null())
