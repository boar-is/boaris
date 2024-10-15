import { type Infer, v } from 'convex/values'
import { captions } from './captions/captions'
import { layouts } from './layouts/layouts'
import { track } from './tracks/track'

export const revision = v.object({
  captions: v.optional(captions),
  layouts: v.optional(layouts),
  tracks: v.optional(v.array(track)),
})

export type Revision = Infer<typeof revision>
