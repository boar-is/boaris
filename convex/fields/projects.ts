import { v } from 'convex/values'

export const projectFields = {
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
}
