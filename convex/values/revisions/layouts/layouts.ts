import { v } from 'convex/values'
import { layoutOverride } from './layoutOverride'
import { layoutPrimary } from './layoutPrimary'

export const layouts = v.object({
  primary: layoutPrimary,
  overrides: v.optional(v.array(layoutOverride)),
})

export type Layouts = typeof layouts.type
