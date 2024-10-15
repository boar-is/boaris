import { v } from 'convex/values'
import { layoutLayer } from '~/convex/values/revisions/layouts/layoutLayer'

export const layoutChangeValue = v.object({
  static: v.optional(layoutLayer),
  floating: v.optional(layoutLayer),
})

export type LayoutChangeValue = typeof layoutChangeValue.type
