import { v } from 'convex/values'

export const tag = v.object({
  slug: v.string(),
  name: v.string(),
  /**
   * If undefined, then the tag is global
   */
  projectId: v.optional(v.id('projects')),
})
