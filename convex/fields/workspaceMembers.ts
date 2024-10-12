import { v } from 'convex/values'

export const workspaceMemberFields = {
  workspaceId: v.id('workspaces'),
  memberId: v.id('users'),
  role: v.union(v.literal('owner'), v.literal('editor')),
}
