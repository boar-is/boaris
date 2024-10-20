import { v } from 'convex/values'
import { layoutLayer } from './layoutLayer'

export const layoutLayers = v.object({
  main: v.optional(layoutLayer),
  overlay: v.optional(layoutLayer),
})
