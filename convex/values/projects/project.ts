import { v } from 'convex/values'

export const project = v.object({
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
})

export type Project = typeof project.type
