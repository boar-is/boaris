import { v } from 'convex/values'
import { layoutMode } from './layoutMode'
import { layoutPrimary } from './layoutPrimary'

export const layouts = v.object({
  primary: layoutPrimary,
  overrides: v.optional(
    v.array(
      v.object({
        modes: v.optional(v.array(layoutMode)),
        minWidthPx: v.optional(v.number()),
        disabled: v.optional(v.boolean()),
        /**
         * @see Delta
         */
        changesDelta: v.any(),
      }),
    ),
  ),
})

export type Layouts = typeof layouts.type
