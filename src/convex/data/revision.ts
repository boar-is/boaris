import { v } from 'convex/values'
import { captions } from './captions'
import { layout } from './layout'

export const revision = v.object({
  captions: v.optional(captions),
  layout: layout,
  tracks: v.array(track),
})
