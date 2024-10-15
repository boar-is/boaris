import { v } from 'convex/values'
import { layoutChange } from './layoutChange'
import { layoutModes } from './layoutMode'

export const layoutPrimary = v.object({
  modes: layoutModes,
  changes: v.optional(v.array(layoutChange)),
})
