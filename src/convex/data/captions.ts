import { v } from 'convex/values'
import { interpolation } from './_shared/interpolation'
import { jsonContent } from './_shared/jsonContent'

export const captions = v.object({
  content: jsonContent,
  interpolation: interpolation,
})
