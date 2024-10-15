import { type Infer, v } from 'convex/values'
import { layoutChange } from './layoutChange'
import { layoutMode } from './layoutMode'

export const layoutPrimary = v.object({
  modes: v.array(layoutMode),
  changes: v.optional(v.array(layoutChange)),
})

export type LayoutPrimary = Infer<typeof layoutPrimary>
