import { v } from 'convex/values'
import { interpolation } from '~/convex/values/_shared/interpolation'

export const captions = v.object({
  /**
   * @see JSONContent
   */
  value: v.any(),
  interpolation: v.optional(interpolation),
})

export type Captions = typeof captions.type
