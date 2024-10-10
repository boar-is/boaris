import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const projects = defineTable({
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
}).index('by_workspaceId_slug', ['workspaceId', 'slug'])
