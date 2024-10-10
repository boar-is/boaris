import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const tags = defineTable({
  slug: v.string(),
  name: v.string(),
  /**
   * If undefined, then the tag is global
   */
  projectId: v.optional(v.id('projects')),
})
  .index('by_slug', ['slug'])
  .index('by_projectId_slug', ['projectId', 'slug'])
