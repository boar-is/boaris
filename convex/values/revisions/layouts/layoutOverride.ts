import { type Infer, v } from 'convex/values'
import { delta } from '~/convex/values/_shared/delta'
import { layoutMode } from './layoutMode'

export const layoutOverride = v.object({
  name: v.optional(v.string()),
  modes: v.array(layoutMode),
  minWidthPx: v.optional(v.number()),
  disabled: v.optional(v.boolean()),
  changesDelta: delta,
})

export type LayoutOverride = Infer<typeof layoutOverride>
