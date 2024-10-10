import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const workspaceMembers = defineTable({
  workspaceId: v.id('workspaces'),
  memberId: v.id('users'),
  role: v.union(v.literal('owner'), v.literal('editor')),
})
  .index('by_workspaceId', ['workspaceId'])
  .index('by_memberId', ['memberId'])
