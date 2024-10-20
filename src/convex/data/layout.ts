import { v } from 'convex/values'
import { layoutChange } from './layoutChange'
import { layoutMode } from './layoutMode'
import { layoutOverride } from './layoutOverride'

export const layout = v.object({
  modes: v.array(layoutMode),
  changes: v.array(layoutChange),
  overrides: v.array(layoutOverride),
})
