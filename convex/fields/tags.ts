import { v } from 'convex/values'

export const tagFields = {
  slug: v.string(),
  name: v.string(),
  /**
   * If undefined, then the tag is global
   */
  projectId: v.optional(v.id('projects')),
}
