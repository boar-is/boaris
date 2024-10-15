import { v } from 'convex/values'

export const action = v.object({
  offset: v.number(),
})

export type Action = typeof action.type
