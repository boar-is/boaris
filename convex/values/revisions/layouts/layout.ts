import { v } from 'convex/values'
import { layoutLayer } from './layoutLayer'

export const layout = v.object({
  static: v.optional(layoutLayer),
  floating: v.optional(layoutLayer),
})
