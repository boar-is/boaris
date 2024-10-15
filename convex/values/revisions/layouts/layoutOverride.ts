import { v } from 'convex/values'
import { delta } from '~/convex/values/_shared/delta'
import { layoutModes } from './layoutMode'

export const layoutOverride = v.object({
  name: v.optional(v.string()),
  modes: layoutModes,
  minWidthPx: v.optional(v.number()),
  disabled: v.optional(v.boolean()),
  changesDelta: delta,
})
