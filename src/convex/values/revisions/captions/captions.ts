import { v } from 'convex/values'
import { interpolation } from '~/convex/values/_shared/interpolation'
import { captionsContent } from './captionsContent'

export const captions = v.object({
  /**
   * @see JSONContent
   */
  content: captionsContent,
  interpolation: v.optional(interpolation),
})
